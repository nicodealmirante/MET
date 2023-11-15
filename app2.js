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

          await adapterProvider.sendText("5491159132301@c.us", "mensaje");
          const id = "54959132301@c.us";
          console.log(asd)
          const templateButtons = [
            {
              index: 1,
              urlButton: {
                displayText: ":star: Star Baileys on GitHub!",
                url: "https://github.com/adiwajshing/Baileys",
              },
            },
            {
              index: 2,
              callButton: {
                displayText: "Call me!",
                phoneNumber: "+1 (234) 5678-901",
              },
            },
            {
              index: 3,
              quickReplyButton: {
                displayText: "This is a reply, just like normal buttons!",
                id: "id-like-buttons-message",
              },
            },
          ];
      
          const templateMessage = {
            text: "Hi it's a template message",
            footer: "Hello World",
            templateButtons: templateButtons,
          };
      
          const abc = await adapterProvider.getInstance();
          await abc.sendMessage(id, templateMessage);

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

  /**
   * Enviar mensaje con metodos propios del provider del bot
   */
 let asd
app.get('/enviar-mensaje', async (req, res) => {



});
  /**
   * Enviar mensajes con metodos nativos del provider
   */
  app.get(`/sm?:${asd}`, async (req, res) => {
    const id = "54959132301@c.us";
    console.log(asd)
    const templateButtons = [
      {
        index: 1,
        urlButton: {
          displayText: ":star: Star Baileys on GitHub!",
          url: "https://github.com/adiwajshing/Baileys",
        },
      },
      {
        index: 2,
        callButton: {
          displayText: "Call me!",
          phoneNumber: "+1 (234) 5678-901",
        },
      },
      {
        index: 3,
        quickReplyButton: {
          displayText: "This is a reply, just like normal buttons!",
          id: "id-like-buttons-message",
        },
      },
    ];

    const templateMessage = {
      text: "Hi it's a template message",
      footer: "Hello World",
      templateButtons: templateButtons,
    };

    const abc = await adapterProvider.getInstance();
    await abc.sendMessage(id, templateMessage);

    res.send({ data: "enviado!" });
  });

  app.get("/get-qr", async (_, res) => {
    const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(YOUR_PATH_QR);

    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
};

main();
