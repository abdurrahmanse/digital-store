import { generateAndSendRegistrationOTP } from "./actions/otp";
async function run() {
  const res = await generateAndSendRegistrationOTP("test@example.com");
  console.log("Result:", res);
}
run();
