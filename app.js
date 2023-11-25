const express = require("express");
const { join } = require("path");
const { createReadStream } = require("fs");
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowflow = addKeyword("hi").addAction(async(ctx,{adapterProvider}) =>{
  
app.post('/enviar-mensaje', async (req, res) => {

    const adapterProvider = req.ws;
  const body = req.body
  const message = body.content
  const phone = body.conversation.meta.sender.phone_number.replace('+','')
  await provider.sendtext(`${phone}@c.us`,message)

  res.send({phone, message})

})

})

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowflow]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
const app = express();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
};

main();
