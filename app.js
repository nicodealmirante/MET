require('dotenv').config()
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const Queue = require('queue-promise')
const MetaProvider = require("@bot-whatsapp/provider/meta")
const MockAdapter = require('@bot-whatsapp/database/mock')
const ServerHttp = require('./src/http')

const ChatwootClass = require('./src/chatwoot/chatwoot.class')
const { handlerMessage } = require('./src/chatwoot')
const  PORTS = 3004
let motivo;  
const mywhatsa = "+5491140054474@s.whatsapp.net";


const venta = require("./flows/venta");
const alquiler = require("./flows/alquiler");
const ordenadores = require("./flows/ordenadores");


///////////////////////////////////// XXXXXXXXXXXXXXXXXXXXX ////////////////////////////
                         /////////         EVENTO VOICE    ///////////////////
/////////////////////////////////////  XXXXXXXXXXXXXXXXXXX   /////////////////////////////////////


  const audiono = addKeyword(EVENTS.VOICE_NOTE)
              .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')
               .addAction(async(ctx, {gotoFlow,endFlow}) => { 
                    return endFlow(Menuflow)})

///////////////////////////////////// XXXXXXXXXXXXXXXXXXXXX ////////////////////////////
                         /////////         FLUJO ALQUILER     ///////////////////
/////////////////////////////////////  XXXXXXXXXXXXXXXXXXX   /////////////////////////////////////


///////////////////////////////////// XXXXXXXXXXXXXXXXXXXXX ////////////////////////////
                         /////////     FLUJO VENTA UNIFILA     ///////////////////
/////////////////////////////////////  XXXXXXXXXXXXXXXXXXX   /////////////////////////////////////


       
                     
///////////////////////////////////// XXXXXXXXXXXXXXXXXXXXX ////////////////////////////
                         /////////     FLUJO VENTA UNIFILA     ///////////////////
/////////////////////////////////////  XXXXXXXXXXXXXXXXXXX   /////////////////////////////////////


  
//////////////////////////////////////////////////////////////// EVENTO WELCOME

  const flowPrincipal = addKeyword(EVENTS.WELCOME) 
  
  .addAnswer("Hola, Gracias por comunicarse. Mi nombre es Luna, Soy una recepcionista virtual. Estoy configurada para brindarle informacion completa e inmediata. En el siguiente menu puede obtener informacion detallada sobre nuestros productos.")
 .addAnswer("Tambien puede dejarnos su telefono o comunicarse con un asesor al *+5491140054474 - NICOLAS*")
 .addAction(async (ctx, {gotoFlow}) => {gotoFlow(Menuflow)})






 const MENU = addKeyword('MENU')

  .addAnswer("*INFORMACION AUTOMATICA*", {capture: false, 
            buttons: [
                {body: '📙 INFO. ALQUILER 📙'},
                {body: '📎 INFO. VENTA 📎'},
                {body: 'PRECIOS'},
            ], delay: 2000 }) 
                   
     .addAnswer("*Contacto*", {capture: true,
        buttons: [
          {body: 'HABLAR CON ASESOR'},
          {body: 'INFO DE LA EMPRESA'},
          {body: 'PAGINA WEB'},
      ], delay: 3000 })
   
   .addAnswer('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
   .addAnswer('FILA VIP \nhttps://filavip.ar')  
   .addAction(async (ctx, {gotoFlow}) => {gotoFlow(Menuflow)

   
          
 /////////////////  FLUJO MENU
  
 if (ctx.body == 'CONTINUAR CON ASESOR') {
   adapterProvider.sendMessage(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)

await  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')

return gotoFlow(Menuflow)
 } else 
if (ctx.body == 'PAGINA WEB') {
  await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
  await flowDynamic('FILA VIP \nhttps://filavip.ar')  
    gotoFlow(Menuflow);
} else if (ctx.body == 'INFO DE LA EMPRESA') {
  await flowDynamic('En [Nombre de Tu Empresa], nos enorgullece ser pioneros en la industria. Desde nuestros inicios en 2018, fuimos los primeros en fabricar el revolucionario Espejo Mágico y la experiencia 360 en Argentina. Además, nuestras innovadoras Unifilas LED han establecido un estándar global en la industria. Con un compromiso constante con la calidad y la creatividad, estamos aquí para hacer que tus eventos sean inolvidables.')
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})}

return  gotoFlow(Menuflow);})


        

////////////////////////////////////////////////////////////////////////////////////////



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
    
   ///     ServerHttp.initialization(bot)
        /**
         * Los mensajes entrantes al bot (cuando el cliente nos escribe! <---)
         */
    
        adapterProvider.on('message', (payload) => {
            queue.enqueue(async () => {
                await handlerMessage({
                    phone:payload.from, 
                    name:payload.pushName,
                    message: payload.body, 
                    mode:'incoming'
                }, chatwoot)
            });
        })
    
        /**
         * Los mensajes salientes (cuando el bot le envia un mensaje al cliente ---> )
         */
        bot.on('send_message', (payload) => {
            queue.enqueue(async () => {
                await handlerMessage({
                    phone:payload.numberOrId, 
                    name:payload.pushName,
                    message: payload.answer, 
                    mode:'outgoing'
                }, chatwoot)
            })
        })

    }
    
    main()