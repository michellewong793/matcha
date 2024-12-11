import express from 'express';
import dotenv from 'dotenv';
import {
  Account,
  ProgramManager,
  AleoKeyProvider,
  NetworkRecordProvider,
  AleoNetworkClient,
} from '@provablehq/sdk';

// Load environment variables
dotenv.config({ path: '.env' });

const app = express();
app.use(express.json()); // For parsing application/json
const PORT = 3000;

// Load the private key from the environment
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  console.error('Error: PRIVATE_KEY is not set in the .env file.');
  process.exit(1);
}

// Initialize the Aleo account and program manager
const account = new Account({ privateKey });
const networkClient = new AleoNetworkClient('https://api.explorer.provable.com/v1');
const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);
const recordProvider = new NetworkRecordProvider(account, networkClient);
const programName = 'zk_date_testnet_program_v2.aleo'; 
const programManager = new ProgramManager(
  'https://api.explorer.provable.com/v1',
  keyProvider,
  recordProvider
);
programManager.setAccount(account);


// const programName = 'zk_date_testnet_program.aleo'; // Update with your program's name
// const programManager = new ProgramManager(
//   'https://api.explorer.provable.com/v1',
//   keyProvider,
//   recordProvider
// );

// Function to set a 10-question hash for a user
app.post('/set-hash', async (req, res) => {
  try {
    const { userAddress, hash } = req.body;

    // Validate inputs
    if (!userAddress || !Array.isArray(hash) || hash.length !== 10) {
      res.status(400).json({
        message: 'Invalid input. Please provide a valid address and a 10-element hash array.',
      });
      return;
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
      res.status(500).json({ message: 'Error setting hash.', error: txId.message });
      return;
    }

    res.status(200).json({ message: 'Hash successfully set!', transactionId: txId });
  } catch (error) {
    console.error('Error setting hash:', error);
    res.status(500).json({ message: 'Error setting hash.', error: error.message });
  }
});

app.get('/program', async (req, res) => {
  try {
    // Fetch the program details using the network client
    const programDetails = await networkClient.getProgram(programName);

    res.status(200).json({
      message: 'Program fetched successfully.',
      programName,
      programDetails,
    });
  } catch (error) {
    console.error('Error fetching program details:', error);
    res.status(500).json({
      message: 'Error fetching program details.',
      error: error.message,
    });
  }
});

app.get('/user/:address', async (req, res) => {
  try {
    const userAddress = req.params.address;

    if (!userAddress) {
      res.status(400).json({
        message: 'Invalid request. Please provide a valid user address.',
      });
      return;
    }

    // Fetch the mapping value for the provided user address
    const mappingValue = await networkClient.getProgramMappingValue(
      programName, // Program name
      "account", // Mapping name
      userAddress // Key (user address)
    );

    res.status(200).json({
      mappingValue,
    });
  } catch (error) {
    console.error('Error fetching mapping value:', error);
    res.status(500).json({
      message: 'Error fetching mapping value.',
      error: error.message,
    });
  }
});

app.post('/compare-users', async (req, res) => {
  try {
    const { userA, userB } = req.body;
    const functionName = "compare_users";

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
    //const keyPair = await programManager.synthesizeKeys(programName, "compare_users", [userAHash, userBHash], account.privateKey());
    //programManager.keyProvider.cacheKeys(`${programName}:${functionName}`, keyPair);
    //const keyProviderParams = new AleoKeyProviderParams({cacheKey: `${programName}:${functionName}`});

  //   // Execute the `compare_users` transition
  //   const txId = await programManager.run({
  //     programName: "zk_date_testnet_program_v2.aleo",
  //     functionName: "compare_users",
  //     inputs:[userAHash, userBHash],
  //     privateKey: account.privateKey()
  // });
    console.log([userAHash, userBHash]);

    let executionResponse = await programManager.run(
      programName,
      functionName,
      [userAHash, userBHash],
      true,
      undefined,
    );
    console.log("compare users executed - result:", executionResponse.getOutputs());

    if (txId instanceof Error) {
      console.error('Error comparing users:', txId.message);
      return res.status(500).json({ message: 'Error comparing users.', error: txId.message });
    }

    res.status(200).json({
      message: 'Comparison successful.',
      transactionId: txId,
    });
  } catch (error) {
    console.error('Error comparing users:', error);
    res.status(500).json({ message: 'Error comparing users.', error: error.message });
  }
});



// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('API is running.');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
