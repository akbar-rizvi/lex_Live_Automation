import loginAutomation from "./automations/login.js";
import askAiAutomation from "./automations/askAi.js";
import askfollowUpAutomation from "./automations/askFollowUp.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

async function main() {
    await loginAutomation();
    await askAiAutomation();
    // await askfollowUpAutomation();

}

main();