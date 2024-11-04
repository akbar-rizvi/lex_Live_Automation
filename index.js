import loginAutomation from "./automations/login.js";
import askAiAutomation from "./automations/askAi.js";
import askfollowUpAutomation from "./automations/askFollowUp.js";
import credits from "./automations/addCredits.js";
import librarySearchAndFeedback from "./automations/librarySearchAndFeedback.js";
import source from "./automations/librarySearch.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

async function main() {
    await loginAutomation();
    await askAiAutomation();
    await credits();
    await librarySearchAndFeedback();
    await source();
    await askfollowUpAutomation();        //---> NOT WORKING

}

main();