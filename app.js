require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const Queue = require('queue-promise')
const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')
const axios =require('axios')
const ChatwootClass = require('./src/chatwoot/chatwoot.class')
const { handlerMessage } = require('./src/chatwoot')

const mywhatsa = "+5491140054474@s.whatsapp.net"


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

const PORT = 3003; // Puerto en el que se ejecutará el servidor Express

// Ruta para manejar los mensajes entrantes del webhook
app.post('/webhook', (req, res) => {
  const incomingMessage = req.body; // Mensaje entrante del webhook

  // Verificar si el mensaje es de tipo "outgoing" y contenido de tipo "cards"
  if (incomingMessage.message_type === 'outgoing' && incomingMessage.content_type === 'cards') {
    // Extraer los datos relevantes del mensaje
    const { name, category, language, processed_params } = incomingMessage.template_params;

    // Realizar acciones basadas en los datos del mensaje, si es necesario
    console.log(`Nombre: ${name}`);
    console.log(`Categoría: ${category}`);
    console.log(`Idioma: ${language}`);
    console.log(`Parámetros procesados:`, processed_params);
  }

  // Puedes realizar otras operaciones aquí, si es necesario

  res.status(200).send('Mensaje recibido y procesado correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

const venta = require("./flows/venta")
const alquiler = require("./flows/alquiler")
const ordenadores = require("./flows/ordenadores")

const audiono = addKeyword(EVENTS.VOICE_NOTE)
  .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')
  .addAction(async (ctx, { gotoFlow, endFlow }) => {
    return endFlow(Menuflow)
  })

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer("Hola, Gracias por comunicarse. Mi nombre es Luna, Soy una recepcionista virtual. Estoy configurada para brindarle información completa e inmediata. En el siguiente menú puede obtener información detallada sobre nuestros productos.")
  .addAnswer("También puede dejarnos su teléfono o comunicarse con un asesor al *+5491140054474 - NICOLAS*")
  .addAction(async (ctx, { gotoFlow }) => {
    gotoFlow(Menuflow)
  })

const Menuflow = addKeyword('MENU')
  .addAnswer("*INFORMACION AUTOMATICA*", {
    capture: false,
    buttons: [
      { body: '📙 INFO. ALQUILER 📙' },
      { body: '📎 INFO. VENTA 📎' },
      { body: 'PRECIOS' },
    ],
    delay: 2000
  })
  .addAnswer("*Contacto*", {
    capture: true,
    buttons: [
      { body: 'HABLAR CON ASESOR' },
      { body: 'INFO DE LA EMPRESA' },
      { body: 'PAGINA WEB' },
    ],
    delay: 3000}, async (ctx, { gotoFlow }) => {

// Lógica para procesar opciones en el menú
if (ctx.body == 'HABLAR CON ASESOR') {
  adapterProvider.sendMessage(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`, {})
  flowDynamic('UN AGENTE SE COMUNICARÁ CON USTED A LA BREVEDAD')
  gotoFlow(Menuflow)
} else if (ctx.body == 'PAGINA WEB') {
  flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')
  flowDynamic('FILA VIP \nhttps://filavip.ar')
  gotoFlow(Menuflow)
} else if (ctx.body == 'INFO DE LA EMPRESA') {
  flowDynamic('En [Nombre de Tu Empresa], nos enorgullece ser pioneros en la industria. Desde nuestros inicios en 2018, fuimos los primeros en fabricar el revolucionario Espejo Mágico y la experiencia 360 en Argentina. Además, nuestras innovadoras Unifilas LED han establecido un estándar global en la industria. Con un compromiso constante con la calidad y la creatividad, estamos aquí para hacer que tus eventos sean inolvidables.')
  flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*')
  flowDynamic('Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs')
  flowDynamic('Selfie Mirror', { media: 'video.mp4' })
  gotoFlow(Menuflow)
}})
    
const chatwoot = new ChatwootClass({
  account: process.env.account,
  token: process.env.token,
  endpoint: process.env.endpoint,
})

const queue = new Queue({
  concurrent: 1,
  interval: 500
})

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([alquiler, venta, ordenadores, Menuflow, audiono])

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken: process.env.jwtToken,
    numberId: process.env.numberId,
    verifyToken: process.env.verifyToken,
    version: 'v18.0'
  })

  const bot = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })

  // ServerHttp.initialization(bot) - Esto debe ser descomentado si deseas habilitar un servidor HTTP

  // Los mensajes entrantes al bot (cuando el cliente nos escribe)
  adapterProvider.on('message', (payload) => {
    queue.enqueue(async () => {
      await handlerMessage({
        phone: payload.from,
        name: payload.pushName,
        message: payload.body,
        mode: 'incoming'
      }, chatwoot)
    })
  })

  // Los mensajes salientes (cuando el bot le envía un mensaje al cliente)
  bot.on('send_message', (payload) => {
    queue.enqueue(async () => {
      await handlerMessage({
        phone: payload.numberOrId,
        name: payload.pushName,
        message: payload.answer,
        mode: 'outgoing'
      }, chatwoot)
    })
  })
}

main()