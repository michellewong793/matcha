import {
  Account,
  ProgramManager,
  AleoKeyProvider,
  NetworkRecordProvider,
  AleoNetworkClient,
} from "@provablehq/sdk";
import dotenv from "dotenv";

export default async function handler(req, res) {
  console.log("Request method:", req.method); // Log the request method
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

  if (req.method === "POST") {
    try {
      const { userA, userB } = req.body;
      const functionName = "compare_users";
      const programName = "zk_date_testnet_program_v2.aleo"; // Adjust as necessary

      // Validate inputs
      if (!userA || !userB) {
        return res.status(400).json({
          message:
            "Invalid input. Please provide addresses for both userA and userB.",
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
          message: "Mapping not found for one or both users.",
          details: { userA: !mappingValueA, userB: !mappingValueB },
        });
      }

      const userAHash = `[${mappingValueA
        .replace(/u8/g, "")
        .replace(/[\[\]\s]/g, "")
        .split(",")
        .map((num) => `${num.trim()}u8`)
        .join(", ")}]`;

      const userBHash = `[${mappingValueB
        .replace(/u8/g, "")
        .replace(/[\[\]\s]/g, "")
        .split(",")
        .map((num) => `${num.trim()}u8`)
        .join(", ")}]`;

      keyProvider.useCache(true);
      programManager.setKeyProvider(keyProvider);

      // Execute the `compare_users` transition
      const program =
        "program zk_date_testnet_program_v2.aleo;\n\nmapping account:\n    key as address.public;\n    value as [u8; 10u32].public;\n\nfunction create_user:\n    input r0 as address.public;\n    input r1 as [u8; 10u32].public;\n    async create_user r0 r1 into r2;\n    output r2 as zk_date_testnet_program_v2.aleo/create_user.future;\n\nfinalize create_user:\n    input r0 as address.public;\n    input r1 as [u8; 10u32].public;\n    set r1 into account[r0];\n\nfunction get_user:\n    input r0 as address.public;\n    async get_user r0 into r1;\n    output r1 as zk_date_testnet_program_v2.aleo/get_user.future;\n\nfinalize get_user:\n    input r0 as address.public;\n    get account[r0] into r1;\n\nfunction compare_users:\n    input r0 as [u8; 10u32].private;\n    input r1 as [u8; 10u32].private;\n    is.neq r0[0u32] r1[0u32] into r2;\n    add 0u8 1u8 into r3;\n    ternary r2 r3 0u8 into r4;\n    is.neq r0[1u32] r1[1u32] into r5;\n    add r4 1u8 into r6;\n    ternary r5 r6 r4 into r7;\n    is.neq r0[2u32] r1[2u32] into r8;\n    add r7 1u8 into r9;\n    ternary r8 r9 r7 into r10;\n    is.neq r0[3u32] r1[3u32] into r11;\n    add r10 1u8 into r12;\n    ternary r11 r12 r10 into r13;\n    is.neq r0[4u32] r1[4u32] into r14;\n    add r13 1u8 into r15;\n    ternary r14 r15 r13 into r16;\n    is.neq r0[5u32] r1[5u32] into r17;\n    add r16 1u8 into r18;\n    ternary r17 r18 r16 into r19;\n    is.neq r0[6u32] r1[6u32] into r20;\n    add r19 1u8 into r21;\n    ternary r20 r21 r19 into r22;\n    is.neq r0[7u32] r1[7u32] into r23;\n    add r22 1u8 into r24;\n    ternary r23 r24 r22 into r25;\n    is.neq r0[8u32] r1[8u32] into r26;\n    add r25 1u8 into r27;\n    ternary r26 r27 r25 into r28;\n    is.neq r0[9u32] r1[9u32] into r29;\n    add r28 1u8 into r30;\n    ternary r29 r30 r28 into r31;\n    output r31 as u8.private;\n";

      let executionResponse = await programManager.run(
        program,
        functionName,
        [userAHash, userBHash],
        true,
        undefined
      );

      const outputs = executionResponse.getOutputs();
      let resultNumber, percentageMatch;

      if (outputs && outputs.length > 0) {
        resultNumber = parseInt(outputs[0].replace("u8", ""), 10);
        percentageMatch = (10 - resultNumber) * 10;
      } else {
        throw new Error("No outputs found from execution.");
      }

      // Return the result in the response
      res.status(200).json({
        message: "Comparison successful.",
        differingResponses: resultNumber,
        matchPercentage: `${percentageMatch}%`,
      });
    } catch (error) {
      console.error("Error comparing users:", error);
      res
        .status(500)
        .json({ message: "Error comparing users.", error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
