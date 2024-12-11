import {
    Account,
    ProgramManager,
    AleoKeyProvider,
    NetworkRecordProvider,
    AleoNetworkClient,
  } from "@provablehq/sdk";
  import dotenv from "dotenv";

export default async function handler(req, res) {
    const networkClient = new AleoNetworkClient(
        "https://api.explorer.provable.com/v1"
      );
      dotenv.config({ path: ".env" });
      const privateKey = process.env.PRIVATE_KEY;
      const account = new Account({ privateKey });
      const keyProvider = new AleoKeyProvider();
      keyProvider.useCache(true);
      const recordProvider = new NetworkRecordProvider(account, networkClient);
      const programName = "zk_date_testnet_program_v2.aleo";
      const programManager = new ProgramManager(
        "https://api.explorer.provable.com/v1",
        keyProvider,
        recordProvider
      );
      programManager.setAccount(account);
  if (req.method === 'POST') {
    try {
      const { userAddress, hash } = req.body;

      // Validate inputs
      if (!userAddress || !Array.isArray(hash) || hash.length !== 10) {
        return res.status(400).json({
          message: 'Invalid input. Please provide a valid address and a 10-element hash array.',
        });
      }

      const formattedUserAddress = userAddress; // The user address as a string
      const formattedHash = `[${hash.map((num) => `${num}u8`).join(', ')}]`; // Format the hash array

      console.log('Formatted inputs:', [formattedUserAddress, formattedHash]);

      // Execute the `create_user` transition
      const txId = await programManager.execute({
        programName: "zk_date_testnet_program_v2.aleo",
        functionName: "create_user",
        fee: 0.2, 
        privateFee: false, 
        inputs: [formattedUserAddress, formattedHash], 
        privateKey: account.privateKey() 
      });

      if (txId instanceof Error) {
        console.error('Error setting hash:', txId.message);
        return res.status(500).json({ message: 'Error setting hash.', error: txId.message });
      }

      return res.status(200).json({ message: 'Hash successfully set!', transactionId: txId });
    } catch (error) {
      console.error('Error setting hash:', error);
      return res.status(500).json({ message: 'Error setting hash.', error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}