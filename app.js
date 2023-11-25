const express = require("express");
const { join } = require("path");
const { createReadStream } = require("fs");
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");


  
app.post('/enviar-mensaje', async (req, res) => {

    const adapterProvider = req.ws;
  const body = req.body
  const message = body.content
  const phone = body.conversation.meta.sender.phone_number.replace('+','')
  console.log(`${phone} asd ${body}`)
  await provider.sendtext(`${phone}@c.us`,message)

  res.send({phone, message})

})
const flowflow = addKeyword("hi").addAction(async(ctx,{adapterProvider}) =>{
})

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowflow]);
  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: "EAAMziR3dWTwBOyI5iwUFZCeBqo2F3yZCvipXQlqUxlvtQkb122Sc91lLMJvZC72DobxvZBwO4lXWIdJ4FCTMISIqfpEPtxbWC9zkeffcbBU7W2Dn9cefzdRNDQEmdma9nxsmz6WfFKsK9Es7RwuZAteGov0mIZA0WPlusxgmmJNpcydS37cmjNa558ETrgfbIkQJJaba4Cv5ZCu8GZAe",
    numberId: "133862353148114",
        verifyToken: 'asdasd',
        version: 'v18.0'})

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
const app = express();

  const PORT = process.env.PORT || 4000;
  app.listen(3005, () => console.log(`http://localhost:${3005}`));
  app.post('/enviar-mensaje', async (req, res) => {

    const adapterProvider = req.ws;
  const body = req.body
  const message = body.content
  const phone = body.conversation.meta.sender.phone_number.replace('+','')
  console.log(`${phone} asd ${body}`)
  await provider.sendtext(`${phone}@c.us`,message)

  res.send({phone, message})

})




};

main();
