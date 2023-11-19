const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
  } = require("@bot-whatsapp/bot");
  const MetaProvider = require("@bot-whatsapp/provider/meta");
  const MockAdapter = require("@bot-whatsapp/database/mock");
const { createDashboard } = require("../src");
  
const  flowPrincipal = addKeyword('hola').addAnswer('buenas!')
  
  const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
  
    const adapterProvider = createProvider(MetaProvider, {
      jwtToken: 'EAAMziR3dWTwBOyI5iwUFZCeBqo2F3yZCvipXQlqUxlvtQkb122Sc91lLMJvZC72DobxvZBwO4lXWIdJ4FCTMISIqfpEPtxbWC9zkeffcbBU7W2Dn9cefzdRNDQEmdma9nxsmz6WfFKsK9Es7RwuZAteGov0mIZA0WPlusxgmmJNpcydS37cmjNa558ETrgfbIkQJJaba4Cv5ZCu8GZAe',
      numberId: '133862353148114',
      verifyToken: 'asdasd',
      version: 'v18.0'
    });
  
    const BotCreate = await createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    });
  
    createDashboard({
        CHATWOOT_URL: "https://chatwoot-production-9374.up.railway.app",
        CHATWOOT_ID: "1",
        CHATWOOT_INBOX_ID: "4",
        CHATWOOT_API_ACCESS_TOKEN: "RzqiiFrYqQUrx5FPuuMXoM3e",
      }, BotCreate)

  };
  
  main();