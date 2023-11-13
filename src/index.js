
const BotWrapper = require("./wrapper.class");
/**
 * Crear 
 * @param {*} args
 * @returns
 */
const createDashboard = async (chatwootEnvs = {}, botInstance = null) => {
    if (!botInstance) throw new Error('NOT_BOT_INSTANCE')
    return BotWrapper.initialize(botInstance, {
        CHATWOOT_URL: "https://chatwoot-production-9374.up.railway.app",
        CHATWOOT_ID: "1",
        CHATWOOT_INBOX_ID: "1",
        CHATWOOT_API_ACCESS_TOKEN: "RzqiiFrYqQUrx5FPuuMXoM3e",
        ...chatwootEnvs
    });
}

module.exports = { createDashboard }