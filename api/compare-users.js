import { networkClient, programManager, keyProvider, account } from 'your-sdk'; // Adjust the import according to your SDK setup

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userA, userB } = req.body;
      const functionName = "compare_users";
      const programName = "zk_date_testnet_program_v2.aleo"; // Adjust as necessary

      // Validate inputs
      if (!userA || !userB) {
        return res.status(400).json({
          message: 'Invalid input. Please provide addresses for both userA and userB.',
        });
      }

      // Fetch mappings for both users
      const mappingValueA = await networkClient.getProgramMappingValue(
        programName,
        "account",
        userA
      );

      const mappingValueB = await networkClient.getProgramMappingValue(
        programName,
        "account",
        userB
      );

      if (!mappingValueA || !mappingValueB) {
        return res.status(404).json({
          message: 'Mapping not found for one or both users.',
          details: { userA: !mappingValueA, userB: !mappingValueB },
        });
      }

      const userAHash = `[${mappingValueA
        .replace(/u8/g, '')
        .replace(/[\[\]\s]/g, '')
        .split(',')
        .map((num) => `${num.trim()}u8`)
        .join(', ')}]`;

      const userBHash = `[${mappingValueB
        .replace(/u8/g, '')
        .replace(/[\[\]\s]/g, '')
        .split(',')
        .map((num) => `${num.trim()}u8`)
        .join(', ')}]`;

      keyProvider.useCache(true);
      programManager.setKeyProvider(keyProvider);

      // Execute the `compare_users` transition
      const executionResponse = await programManager.run(
        programName,
        functionName,
        [userAHash, userBHash],
        true,
        undefined
      );

      const outputs = executionResponse.getOutputs();
      let resultNumber, percentageMatch;

      if (outputs && outputs.length > 0) {
        resultNumber = parseInt(outputs[0].replace('u8', ''), 10);
        percentageMatch = (10 - resultNumber) * 10;
      } else {
        throw new Error("No outputs found from execution.");
      }

      // Return the result in the response
      res.status(200).json({
        message: 'Comparison successful.',
        differingResponses: resultNumber,
        matchPercentage: `${percentageMatch}%`,
      });
    } catch (error) {
      console.error('Error comparing users:', error);
      res.status(500).json({ message: 'Error comparing users.', error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
