/**require('dotenv').config()
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

 ServerHttp.initialization(bot) 

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
/** */
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

/** * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */




////////////////////////////////////////////////////////////////////////////////////////////
////     FUNCIONES
/////////////////////////////////////////////////////////////////////////////////////////
/**
 function numero(nnum){
let nuevoContenido = `\n${nnum}`;
  fs.appendFile('numeros.txt', nuevoContenido, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
          console.log('Numero Agendado de Venta');
  }
  function numero2(nnum){
    let nuevoContenido = `\n${nnum}`;
fs.appendFile('numerosalquiler.txt', nuevoContenido, (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
console.log('Numero Agendado de Alquiler');*/ 
////////////////////////////////////////////////////////////////////////////////////////
//////////// FLUJO SPAM //////////
////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// FLUJO CLIENTE
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const Cliente = addKeyword(["AGEN-TE"],{sensitive:true})
    .addAnswer("*UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD*", {
      capture: false},async (ctx, { endFlow, gotoFlow, MetaProvider, flowDynamic}) => {
  //      await MetaProvider.sendtext(mywhatsa, `*Directo* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
   await flowDynamic('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')
return endFlow(Menuflow)
}

)        
/** 
})
         
    .addAnswer("ESTE CHAT AUTOMATICO A FINALIZADO. NOS PONDREMOS EN CONTACTO CON USTED", {capture:true, delay:5000}, async (ctx ,{gotoFlow,endFlow,provider,fallBack}) => {
          if(ctx.body == "SM" ||ctx.body == "Sm" || ctx.body == "sm"){
               return gotoFlow(Menuflow),
              endFlow()}
    const mywhatsa = "5491140054474@s.whatsapp.net";
    await provider.sendtext(mywhatsa, `SIG MSJ\nNumero: +${ctx.from}\nINFO: *${ctx.body}*`) 
     return fallBack("Gracias por comunicarse con nosotros. Escriba *SM* para volver al menu inicial")
  }) 
*/

//////////////////////////////zx</////////////////////////////////// EVENTO VOICE

const audiono = addKeyword(EVENTS.VOICE_NOTE)
  .addAnswer('Disculpe, no puedo escuchar audios. Por favor utilice solo texto.')
  .addAction(async(ctx, {gotoFlow,endFlow}) => { 
return endFlow(Menuflow)})

///////////////////////////////////////////////////////////////// FLUJO ALQUILER


const flowsAlquiler = addKeyword(['INFO. ALQUILER'], {sensitive: true})
          .addAnswer('👌Te envio la info de alquiler.')
          
          .addAnswer('Selfie Mirror',{
               media: 'banner22.jpg'})
          
         .addAnswer(['*Espejo Mágico Selfie Mirror*',
                     '\nDiseño elegante: Nuestro espejo mágico tiene un diseño moderno y elegante que se adapta a cualquier tipo de evento.',
                    'Su apariencia sofisticada agrega un toque especial al ambiente.',
                    '\nAccesorios y decoración: Contamos con una variedad de accesorios y elementos decorativos para personalizar aún ',
                     'más la experiencia. Puedes elegir entre diferentes marcos, sombreros, anteojos, pizarras con mensajes divertidos' ,
                      'y más. Estos elementos permiten que los invitados se diviertan y creen fotos únicas.',
                    '\nTamaño y portabilidad: El espejo mágico tiene dimensiones compactas que facilitan su transporte e instalación en ',
                    'diferentes espacios. Es lo suficientemente versátil como para adaptarse a salones de eventos, fiestas en exteriores ',
                   'y otros lugares.',
                   '\nOpciones de software: Nuestro espejo mágico viene con un software propio que ofrece una amplia gama de funciones ',
                   'y personalización. Puedes elegir entre diferentes plantillas de diseño, agregar efectos especiales a las fotos y configurar ',
                   'opciones de impresión según tus preferencias.',
                   '\nTiempo de alquiler: El tiempo de alquiler del espejo mágico es flexible y se adapta a las necesidades de tu evento.',
                   ' Puedes contratarlo por horas o por el tiempo que consideres necesario para brindar una experiencia completa a tus invitados.',
                   '\nRecuerda que nuestros servicios incluyen el montaje, desmontaje y la asistencia de personal capacitado durante todo' ,
                   'el evento. Estamos comprometidos en asegurar que tus invitados disfruten al máximo de la experiencia con el espejo mágico.',
                   'Valor Servicio por 2 Horas $ 100.000 (base)',
                   'El valor de la Hora adicional es de $ 50.000'])
        
        .addAnswer('Espejo Mágico Selfie Mirror', {
            media: 'banner3.jpg'})
        
        .addAnswer(['*360 Super Slow.*',
                 '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
                'Los videos son filmados y compartidos en el momento ya editados automáticamente',
                'Incluye accesorios (pistola lanza burbujas, lanza billetes.)',
               'El valor del servicio de 2 horas (2023) es de $ 100.000 .-',
               'El valor del servicio de 2 horas (2024) es de U$s 100 .-',
               'El valor de la Hora adicional (2023) es de $ 50.000 .-'      ])  
                     
            

               .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'})
          
       

      .addAnswer(['🚚El valor no incluye traslados',
             '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias'])
       ///      numero2(ctx.from)
       .addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
    .addAnswer('Showroom', {media: 'video.mp4'})
    .addAnswer('Selfie Mirror', {media: 'video2.mp4'})
    .addAnswer('Captura 360', {media: 'video360.mp4'})
   .addAnswer('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')
        
   /* .addAnswer("*CONTINUAR*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ],delay: 3000
  }, async (ctx, { endFlow, gotoFlow, adapterProvider, flowDynamic}) => {
    console.log('ALQUILER')

if(ctx.body == 'CONTINUAR CON AGENTE'){
  return gotoFlow(Cliente)
} else if(ctx.body == 'VOLVER AL MENU') {
 return gotoFlow(Menuflow)}
  else if (ctx.body == 'FINALIZAR') {
   await flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
return endFlow()
}}
 
    let fecha
    let asd2;
let asd;
var res1;
var res2;
var total;
 const getTicket = async (donde) => {

    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde.replace(' ','%20')}Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=AIzaSyB-o-yLjNarKluwNV8z8IZTDhosOlM1NOw`,
    };
    const response = await axios(config)
    res1 = response.data["destination_addresses"][0]
    asd2 = response.data["rows"][0]["elements"][0]["duration"].text
    asd = Math.round(response.data["rows"][0]["elements"][0]["distance"].value/1000)
total=(((asd*250)/3000)*3000)}

 

const alquila22 = addKeyword('alquilawer',{sensitive:true})  

.addAnswer('Cual es la fecha del evento? Escriba en este formato (DD-MM-AAAA)', {capture: true}, async(ctx,{}) => {fecha=ctx.body})
.addAnswer('Donde sería el evento? Escriba en este formato (LOCALIDAD - PROVINCIA)', {capture:true}, async (ctx, { endFlow, provider, flowDynamic}) => {
await getTicket(ctx.body)
var traslados = `*TRASLADOS*\nDISTANCIA: *${Math.round(asd)}* KM \nTIEMPO: *${asd2}*\nLUGAR: *${res1}*\nVALOR: *$ ${total}*.-\n*`

if((asd)<=200){
  await flowDynamic(traslados)
}a



awprovider.sendtext(mywhatsa, `*Alquiler* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body} \nFecha ${fecha}* \n\n ${traslados}`)
await flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
return endFlow(Menuflow)})
/////////////////////////////////////////////////////////////////////////////////////////// FLUJO VENTA
const organizadorflow = addKeyword('UNIFILA LED',{sensitive:true})
.addAnswer(['¡Optimiza tus espacios y atrae la atención de tus clientes con nuestros organizadores de fila con tecnología Pixel LED!\n',
'En SELFIE MIRROR, entendemos la importancia de mantener tus espacios organizados y atractivos. Nuestros organizadores de fila no solo te ayudarán a mantener un flujo ordenado de clientes, sino que también añadirán un toque de modernidad y estilo a tu negocio.\n',
'¿Qué hace que nuestros organizadores de fila con tecnología Pixel LED sean especiales?\n',
'✨ Iluminación espectacular: Nuestra tecnología Pixel LED ofrece una iluminación vibrante y personalizable que destacará tu marca y creará una experiencia memorable para tus clientes.\n',
'🧹 Organización efectiva: Mantén tus filas en orden y evita la confusión con nuestros organizadores de alta calidad. ¡El caos será cosa del pasado!\n',
'🎨 Personalización total: Personaliza la apariencia de tus organizadores para que se adapten a tu imagen corporativa o al tema de tu negocio.\n',
'🌟 Destaca entre la multitud: Con nuestros organizadores de fila Pixel LED, tu negocio destacará en cualquier entorno, desde eventos, ferias comerciales hasta tiendas minoristas y restaurantes.\n',
'¡Es el momento de darle a tu negocio una ventaja competitiva!\n',
'¡Haz que tu negocio brille con nuestros organizadores de fila Pixel LED! 💫✨ #TecnologíaLED #OrganizaciónEfectiva #AtraeClientes\n',
'*VALORES*\n',
'https://filavip.ar'])
.addAnswer('FILA VIP', {media: 'ledselfie.mp4'})
.addAnswer('FOTO FILA VIP', {media: '111.jpg'})
.addAction(async (ctx, { gotoFlow,flowDynamic}) => {
  await  flowDynamic([`*VALOR FILA VIP*\n
  ORGANIZADORES DE FILA PIXEL\n
    🚧 NEGRO  ◼️  PLATA 🥈  ORO  🥇 \n
   AR$ 60.000 ◼️ 85.000 🥈 95.000 🥇\n
  SOGAS TRENZADA. CAPUCHON\n
   ⛓️  NEGRO ◼️  PLATA  🥈  ORO  🥇\n
  AR$ 14.000 ◼️ 15.000 🥈 25.000 🥇\n
   PACK 4 PIXEL + 2 SOGAS (NEGRO)\n
  💲💲💲 AR$ 255.000 💲💲💲`])
  .addAnswer('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')

 return gotoFlow(Menuflow)
}
)

  const flowVenta = addKeyword(['INFO. VENTA'], { sensitive: true })
          .addAnswer('👌 Te envío la info de Venta.',{delay: 2000})

          .addAnswer(['*Espejo Mágico Selfie Mirror*',
                    '\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
                    'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
                    'especiales.',
                   '\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
                   'Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
                    'y fiestas.'  ])

        .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'})
    

        .addAnswer(['La facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el ',
                      'botón de encendido para que empiece a funcionar. Esto agiliza la instalación y permite que los eventos comiencen rápidamente.',
                    '\nEs importante mencionar que el Selfie Mirror no incluye una impresora, pero está preparado para funcionar con cualquier ',
                    'impresora que se adapte a las necesidades del cliente. Esto brinda flexibilidad para elegir la impresora que mejor se ajuste a',
                    'los requerimientos de impresión.',
                   '\nEn cuanto al precio, el valor del equipo es de 1500 dólares o pesos al valor del dólar blue del día.'],{ capture: false }, async (ctx, { flowDynamic,axios}) => {
                                            
                           
                    } )
        .addAnswer('Equipo Slim Selfie Mirror', {media: 'banner4.jpg'})

        .addAnswer(['*Plataforma 360 Super Slow*',
        '\nNuestra plataforma incluye todo lo necesario para poder brindar un servicio profesional. Incluye Monitor transmitiendo en vivo. Proceso de editado automatico.',
        ' (Una vez grabado se reproduce en el monitor automaticamente ya editado)',
        'Los invitados podran escanear un codigo QR UNICO para poder visualizar todos los videos del evento *EN EL MOMENTO*',
                  '\nLa plataforma controlada por mando a distancia incluye: variador de velocidad, arranque y parada suave, soporte reforzado, Aro de Led, 4 bastones led pixel de 1 mt, led rgb en plataforma, stand para TV (no incluida) y asesoramiento tecnico.',
                 '\n*Equipo listo para trabajar*.',
                'El valor del equipo es de 1500 U$S.' ,
                '▶ REQUERIDO:Necesita contar con un Apple Iphone 13 o suoperior (dispositivo de grabacion)',
      'y un TV LED de 32 o mas (monitoreo)'])
        .addAnswer('Selfie Mirror', {media: 'video3.mp4'})

        .addAnswer('Formas de pago: efectivo, transferencia/depósito')

        .addAnswer('Selfie Mirror', {media: 'banner22.jpg'})
       .addAnswer(['*UNIFILA LED*\n¡Optimiza tus espacios y atrae la atención de tus clientes con nuestros organizadores de fila con tecnología Pixel LED!\n',
        'En SELFIE MIRROR, entendemos la importancia de mantener tus espacios organizados y atractivos. Nuestros organizadores de fila no solo te ayudarán a mantener un flujo ordenado de clientes, sino que también añadirán un toque de modernidad y estilo a tu negocio.\n',
        '¿Qué hace que nuestros organizadores de fila con tecnología Pixel LED sean especiales?\n',
        '✨ Iluminación espectacular: Nuestra tecnología Pixel LED ofrece una iluminación vibrante y personalizable que destacará tu marca y creará una experiencia memorable para tus clientes.\n',
        '🧹 Organización efectiva: Mantén tus filas en orden y evita la confusión con nuestros organizadores de alta calidad. ¡El caos será cosa del pasado!\n',
        '🎨 Personalización total: Personaliza la apariencia de tus organizadores para que se adapten a tu imagen corporativa o al tema de tu negocio.\n',
        '🌟 Destaca entre la multitud: Con nuestros organizadores de fila Pixel LED, tu negocio destacará en cualquier entorno, desde eventos, ferias comerciales hasta tiendas minoristas y restaurantes.\n',
        '¡Es el momento de darle a tu negocio una ventaja competitiva!\n',
        '¡Haz que tu negocio brille con nuestros organizadores de fila Pixel LED! 💫✨ #TecnologíaLED #OrganizaciónEfectiva #AtraeClientes\n',
        '*VALORES*\n',
        'https://filavip.ar'])
        .addAnswer('FILA VIP', {media: 'ledselfie.mp4'})
        .addAnswer('FOTO FILA VIP', {media: '111.jpg'})
        .addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
.addAnswer('Showroom', {media: 'video.mp4', delay: 4000})
.addAnswer('Selfie Mirror', {media: 'video2.mp4'})
.addAnswer('Captura 360', {media: 'video360.mp4'})
        .addAnswer('✈️ *Enviamos a todo el País*.', { capture: false }, async (ctx, { flowDynamic,gotoFlow, endFlow }) => {
          let dolar
          await fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
    .then(json => dolar = json.venta)
    console.log('VENTA')
 await flowDynamic(`*VALOR ESPEJO MAGICO* \n
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓 `)

await flowDynamic(`*VALOR PLATAFORMA 360*\n     
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓`)

await flowDynamic(`Cotizacion actual: \n💱[1 U$S = AR ${dolar}.-]💱`)
await flowDynamic([`*VALOR FILA VIP*\n
 ORGANIZADORES DE FILA PIXEL\n
   🚧 NEGRO  ◼️  PLATA 🥈  ORO  🥇 \n
  AR$ 60.000 ◼️ 85.000 🥈 95.000 🥇\n
 SOGAS TRENZADA. CAPUCHON\n
  ⛓️  NEGRO ◼️  PLATA  🥈  ORO  🥇\n
 AR$ 14.000 ◼️ 15.000 🥈 25.000 🥇\n
  PACK 4 PIXEL + 2 SOGAS (NEGRO)\n
 💲💲💲 AR$ 255.000 💲💲💲`])
})

.addAnswer('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')

//////////////////////////////////////////////////////////////// EVENTO WELCOME
/** .addAnswer("*CONTINUAR*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ], delay: 2000
  }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {

if (ctx.body == 'CONTINUAR CON AGENTE') {

  await provider.sendtext(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
await  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
return gotoFlow(Menuflow)
return endFlow(flowVenta)

} else if (ctx.body == 'VOLVER AL MENU') {

 return gotoFlow(Menuflow)
 return endFlow(flowVenta)

  } else if (ctx.body == 'FINALIZAR') {
  await  flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
return endFlow()
}}
)        
   

.addAnswer("*INFO*", { 
  capture: true,
  buttons: [
      {body: 'INFO. ALQUILER'},
      {body: 'INFO. VENTA'},
      {body: 'UNIFILA LED'},
  ], delay: 5000}
) .addAnswer("Contacto", { 
  capture: true,
  buttons: [
      {body: 'HABLAR CON ASESOR'},
      {body: 'INFO DE LA EMPRESA'},
      {body: 'PAGINA WEB'},
  ],
delay: 2000 }, async (ctx, { fallBack, gotoFlow, provider, flowDynamic}) => {

if (ctx.body == 'PAGINA WEB') {
flowDynamic('https://www.espejoselfiemirror.com.ar')        
    gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
nombre = "Cliente"
return gotoFlow(Cliente)
} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}});
*/
 //////////////////////////////////////////////////////////////// EVENTO WELCOME




  const flowPrincipal = addKeyword(EVENTS.WELCOME)

.addAnswer("Hola, gracias por comunicarte con Selfie Mirror. Esta es una línea de respuestas automáticas. Responde con el número índice para continuar o continua al\n +5491140054474 - Nicolás")
.addAnswer("Opciones", {capture: false, 
      buttons: [
          {body: 'INFO. ALQUILER'},
          {body: 'INFO. VENTA'},
          {body: 'UNIFILA LED'},
      ], delay: 2000 }
    ) 
    .addAnswer("*Contacto*", { 
      capture: true,
      buttons: [
        {body: 'INFO DE LA EMPRESA'},
          {body: 'PAGINA WEB'},
      ],
   delay: 3000 }, async (ctx, { fallBack, gotoFlow, adapterProvider, flowDynamic}) => {

if (ctx.body == 'PAGINA WEB') {
await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
await flowDynamic('FILA VIP \nhttps://filavip.ar')  
       return gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
  await flowDynamic('COMUNIQUESE A ESTE NUMERO PARA HABLAR CON ASESOR +5491140054474')


} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}});
          
    
 /**   {capture: true},async (ctx, {provider}) => {

curl 'https://graph.facebook.com/v18.0/106540352242922/messages' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer EAAJB...' \
-d '{
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "+16505555555",
    "type": "interactive",
    "interactive": {
        "type": "cta_url",
        "header": {
            "text": "Available Dates"
        },
        "body": {
            "text": "Tap the button below to see available dates."
        },
        "footer": {
            "text": "Dates subject to change."
        },
        "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
        }
    }
}'



  
            const headerText = 'MENU'
            const bodyText = 'Informacion y Precios'
            const footerText = 'Seleccione'
            const buttonList = 'Lista'
            const listParams = [
                {
                   "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
                        {
                            id: 'ID_2',
                            title: 'FilaVip',
                            description: 'Organizadores de fila LED'
                        },
                        {
                            id: 'ID_3',
                            title: 'Plataforma 360 Super Slow',
                            description: 'Plataforma con camara giratoraia'
                        }
                    ]
                },
                {
                    title: 'ALQUILER',
                    rows: [
                        {
                            id: 'ID_1',
                            title: 'Selfie Mirror',
                            description: 'Espejo Magico'
                        },
                        {
                            id: 'ID_2',
                            title: 'Plataforma 360 Super Slow',
                            description: 'Plataforma con camara giratoraia'
         } ] },
                        {
                          title: 'Empresa',
                          rows: [
                              {
                                  id: 'ID_1',
                                  title: 'Ubicacion',
                                  description: 'Ubicacion y Horarios'
                              },
                              {
                                  id: 'ID_2',
                                  title: 'Sitio Web',
                                  description: 'Paginas de productos'
                              }
                  
                    ]
                }
  
            const headerText = 'MENU'
            const bodyText = 'Informacion y Precios'
            const footerText = 'Seleccione'
            const buttonList = 'Lista'
            const listParams = [
                {
                   "action": {
            "name": "cta_url",
            "parameters": {
                "display_text": "See Dates",
                "url": "https://www.luckyshrub.com?clickID=kqDGWd24Q5TRwoEQTICY7W1JKoXvaZOXWAS7h1P76s0R7Paec4"
            }
            ]
            await provider.sendList(ctx.from, headerText, bodyText, footerText, buttonList ,listParams)
        }
        

*/

  /////////////////////////////////////////////////////////////////////////  FLUJO MENU
  
  const Menuflow = addKeyword(["me-nu"], { sensitive: true })

  .addAnswer("*Info*", { 
            capture: false,
            buttons: [
                {body: 'INFO. ALQUILER'},
                {body: 'INFO. VENTA'},
                {body: 'UNIFILA LED'},
            ],
          }
) 
.addAnswer("*CONTACTO*", { 
  capture: true,
  buttons: [
      {body: 'HABLAR CON ASESOR'},
      {body: 'INFO DE LA EMPRESA'},
      {body: 'adadsdd', url: "https://wa.me/541166704322"},
  ],
delay: 2000 }, async (ctx, { fallBack, gotoFlow, provider, flowDynamic}) => {
if (ctx.body == 'PAGINA WEB') {
  await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
  await flowDynamic('FILA VIP \nhttps://filavip.ar')  
    gotoFlow(Menuflow);
} else if (ctx.body == 'HABLAR CON ASESOR') {
nombre = "Cliente"
return gotoFlow(Cliente)
} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )

await flowDynamic('Selfie Mirror', {media: 'video.mp4'})

return  gotoFlow(Menuflow);
}   })



  const Menuflow2 = addKeyword(["me-?nu"], { sensitive: true })

  
     .addAnswer("Menu", { 
                      capture: true,
                      buttons: [
                          {body: 'HABLAR CON ASESOR'},
                          {body: 'INFO DE LA EMPRESA'},
                          {body: 'PAGINA WEB'},
                      ],
                   delay: 2000 }, async (ctx, { gotoFlow, provider, flowDynamic}) => {
              
              if (ctx.body == 'PAGINA WEB') {
                await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  

                await flowDynamic('FILA VIP \nhttps://filavip.ar')  
                      return  gotoFlow(Menuflow);
      } else if (ctx.body == 'HABLAR CON ASESOR') {
         nombre = "Cliente"
         return gotoFlow(Cliente)
      } else if (ctx.body == 'INFO DE LA EMPRESA') {
       await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
       await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
   
       await flowDynamic('Selfie Mirror', {media: 'video.mp4'})
      
      return  gotoFlow(Menuflow);
         } 
        });
        

////////////////////////////////////////////////////////////////////////////////////////



    const chatwoot = new ChatwootClass({
        account: '1',
        token: 'RzqiiFrYqQUrx5FPuuMXoM3e',
        endpoint: 'https://chatwoot-production-9374.up.railway.app'
        
    })
    
    const queue = new Queue({
        concurrent: 1,
        interval: 500
    })
    
    const main = async () => {
        const adapterDB = new MockAdapter()
        const adapterFlow = createFlow([flowPrincipal, flowVenta, flowsAlquiler, Cliente, Menuflow, audiono, Menuflow2, alquila22])

        const adapterProvider = createProvider(MetaProvider, {
          jwtToken: 'EAAMziR3dWTwBOyI5iwUFZCeBqo2F3yZCvipXQlqUxlvtQkb122Sc91lLMJvZC72DobxvZBwO4lXWIdJ4FCTMISIqfpEPtxbWC9zkeffcbBU7W2Dn9cefzdRNDQEmdma9nxsmz6WfFKsK9Es7RwuZAteGov0mIZA0WPlusxgmmJNpcydS37cmjNa558ETrgfbIkQJJaba4Cv5ZCu8GZAe',
          numberId: '133862353148114',
          verifyToken: 'asdasd',
          version: 'v18.0'})
        
          
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