
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
const mywhatsa = "5491140054474@s.whatsapp.net";

const menuB = addKeyword('MENU')
.addAnswer("MENU?",{capture: true, 
  buttons: [
      {body: 'INFO. ALQUILAR'},
      {body: 'INFO. VENTA'},
      {body: 'ASESOR DE VENTAS'},
  ], delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
  async (ctx, { gotoFlow, inRef }) => {
return gotoFlow(menu8)
      if (ctx?.idleFallBack) {
          return gotoFlow(flujoFinal)
      }
  }
  )

  const flowmeme = addKeyword('INFO. EMPRESA', {sensitive: true})
  .addAnswer('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
  .addAnswer('FILA VIP \nhttps://filavip.ar')  
  .addAnswer('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
  .addAnswer('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
  .addAnswer('Selfie Mirror', {media: 'video.mp4'})



const flowEmpresa = addKeyword('ASESOR DE VENTAS', {sensitive: true})
.addAnswer('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
.addAnswer('FILA VIP \nhttps://filavip.ar')  
.addAnswer('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
.addAnswer('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
.addAnswer('Selfie Mirror', {media: 'video.mp4'})
.addAction(async(ctx,{provider}) => {
  
  if(data1=='venta'){

       provider.sendtext(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\n Nombre: *${ctx.pushName}n\INFO: \n*${ctx.body}*`)

  }else if(!data2==null ){

  provider.sendtext(mywhatsa, `*DIRECTO* \nNumero: +${ctx.from}\n Nombre: *${ctx.pushName}n\INFO: \n*${ctx.body}*`)
  }  
  else if(data2==null){

     provider.sendtext(mywhatsa, `*DIRECTO* \nNumero: +${ctx.from}\n Nombre: *${ctx.pushName}n\INFO: \n*${ctx.body}*`)
  }
  return  gotoFlow(MenuB);}
)
  // idle: 2000 = 2 segundos



const flowVenta= addKeyword(['INFO. VENTA'], { sensitive: true })
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

gotoFlow(menu8)
}
)
    



const flowAlquiler = addKeyword(['INFO. ALQUILER'], {sensitive: true})
          
//777777777777777777777777777777777777 ALQUILER



.addAnswer('👌Te envio la info de alquiler.')

.addAnswer('Selfie Mirror',{
media: 'banner22.jpg'})


//ESPEJO
.addAnswer(['*El Espejo Mágico Selfie Mirror: Transforma tus Eventos en Experiencias Inolvidables*',
'En Selfie Mirror, hemos fusionado tecnología y entretenimiento para brindarte una experiencia única en tus eventos. Con nuestro servicio de alquiler del Espejo Mágico Selfie Mirror, tu celebración se transforma en una ocasión inolvidable.',
'Nuestro Espejo Mágico no es solo un dispositivo, es una obra de arte por derecho propio. Su diseño elegante y moderno añade una dosis de sofisticación a cualquier evento, desde bodas y cumpleaños hasta fiestas corporativas.',
'Ofrecemos un software personalizado que te permite personalizar cada aspecto de las fotos. Desde plantillas de diseño exclusivas hasta efectos especiales y opciones de impresión a medida, puedes dar rienda suelta a tu creatividad.',
'Nuestra colección de accesorios y elementos de decoración es diversa y emocionante. Desde sombreros y anteojos extravagantes hasta pizarras con mensajes ingeniosos, tus invitados pueden transformarse y crear recuerdos únicos.',
'Sin restricciones en la cantidad de fotos que pueden tomarse durante el tiempo de alquiler, cada sonrisa, pose y momento especial se pueden capturar y recordar.',
'El Espejo Mágico ofrece la emoción de las impresiones instantáneas. Tus invitados pueden llevarse recuerdos físicos que atesorarán durante años.',
'Nuestro equipo se encarga del montaje y desmontaje del Espejo Mágico, lo que te permite relajarte y disfrutar del evento. Además, un técnico capacitado está presente durante todo el evento para garantizar que todo funcione sin problemas y para ayudar a los invitados.',
'Todas las fotos se almacenan digitalmente y se proporciona acceso a una galería en línea. Tus invitados pueden descargar sus fotos en cualquier momento.',
'El tiempo de alquiler se adapta a tus necesidades. El alquiler mínimo es de 2 horas, pero puedes extenderlo según tus preferencias.',
'En Selfie Mirror, nuestra pasión es hacer que tu evento sea inolvidable. Ya sea una boda emocionante, un cumpleaños especial o una reunión corporativa, el Espejo Mágico Selfie Mirror agrega un toque mágico a cada ocasión. Contáctanos hoy para obtener más información, disponibilidad y precios. ¡Haz que tus momentos especiales brillen con el Espejo Mágico Selfie Mirror!'])


.addAnswer('Espejo Mágico Selfie Mirror', {
media: 'banner3.jpg'})
/// 360  
.addAnswer(['*Alquiler de Plataforma 360: Eleva la Experiencia de tus Eventos Sociales*',
'En Selfie Mirror, te ofrecemos la oportunidad de llevar la diversión y la emoción de la fotografía y video a un nivel completamente nuevo con nuestra Plataforma 360. Ya no se trata solo de capturar momentos, se trata de crear experiencias memorables.',
'Nuestra Plataforma 360 te brinda la oportunidad de sorprender a tus invitados con un servicio de alquiler único y emocionante. ¿Qué puedes esperar?',
'1. **360 Grados de Diversión**:',
'Imagina poder capturar todos los ángulos de diversión en tu evento. Nuestra plataforma 360 grados registra cada sonrisa, cada risa y cada gesto especial desde todos los ángulos. Tus invitados se convierten en estrellas en un set de grabación en 360 grados.',
'2. **Edición Instantánea**:',
'Lo que hace que nuestra plataforma 360 sea aún más especial es la edición en tiempo real. Los videos son filmados y compartidos en el momento, ya editados automáticamente. Esto significa que tus invitados pueden disfrutar de la emoción de ver sus momentos especiales de inmediato.',
'3. **Accesorios Divertidos**:',
'No hay diversión sin accesorios, ¿verdad? Ofrecemos una amplia variedad de accesorios, desde pelucas y anteojos extravagantes hasta pistolas lanzaburbujas y cotillón. Tus invitados pueden elegir sus accesorios y transformarse en personajes únicos.',
'4. **Flexibilidad en el Tiempo**:',
'El tiempo de alquiler de la Plataforma 360 es flexible y se adapta a las necesidades de tu evento. Puedes contratarla por un mínimo de 2 horas, asegurándote de que tus invitados tengan suficiente tiempo para divertirse y crear recuerdos inolvidables.',
'En Selfie Mirror, nos apasiona llevar la diversión y la innovación a tus eventos sociales. Ya sea una fiesta de cumpleaños, una boda o cualquier ocasión especial, la Plataforma 360 agrega una dimensión emocionante que tus invitados recordarán. Contáctanos hoy para obtener más información, disponibilidad y precios. ¡Haz que tus eventos sociales sean inolvidables con la Plataforma 360 de Selfie Mirror!'])

.addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'})
.addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
.addAnswer('Showroom', {media: 'video.mp4'})
.addAnswer('Selfie Mirror', {media: 'video2.mp4'})
.addAnswer('Captura 360', {media: 'video360.mp4'})
.addAnswer(['  *VALORES* ',
'\n360 Super Slow.*',
'\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
'Los videos son filmados y compartidos en el momento ya editados escaneando un codigo QR',
'Incluye accesorios (pistola lanza burbujas, lanza billetes.)',
'El valor del servicio de 2 horas es de $ 100.000 .-'])
.addAnswer(['\n*Espejo Magico*',
'\nValor Servicio por 2 Horas $ 100.000',
'\nValor ambos servicios por 2 Horas $ 180.000',
'\nEl minimo de alquiler son 2 horas',
'\nEl valor de la Hora adicional es de $ 50.000'])
.addAnswer(['🚚El valor no incluye traslados'])



.addAnswer("Localidad",{capture: true, 

     delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
    async (ctx, { gotoFlow, inRef }) => {
          data1=ctx.body
        if (ctx?.idleFallBack) {
            return gotoFlow(flujoFinal)
        }
    }
    )
.addAnswer("FECHA?",{capture: true, 
    buttons: [
        {body: 'INFO. ALQUILAR'},
        {body: 'INFO. VENTA'},
        {body: 'ASESOR DE VENTAS'},
    ], delay: 2000 , idle: 200000 }, // idle: 2000 = 2 segundos
    async (ctx, { gotoFlow, inRef }) => {
return gotoFlow(menu8)
        if (ctx?.idleFallBack) {
            return gotoFlow(flujoFinal)
        }
    }
    )

.addAnswer("UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD, O PUEDE COMUNICARSE DIRECTAMENTE AL *+5491140054474 - NICOLAS*", async (ctx, {gotoFlow}) => {     // idle: 2000 = 2 segundos

return gotoFlow(menuB)})


  const flowPrincipal = addKeyword(EVENTS.WELCOME)

.addAnswer("Opciones", {capture: false, 
      buttons: [
          {body: 'INFO. ALQUILER'},
          {body: 'INFO. VENTA'},
         // {body: 'UNIFILA LED'},
      ], delay: 2000 }
      
    ) 
    .addAnswer("PARA CONTINUAR CON LA OPERACION -> ASESOR NICOLAS *+5491140054474* ", async(ctx,{gotoFlow})=>{return gotoFlow(menuB)})
      
    const flujoFinal = addKeyword('HH').addAnswer('Sigue ahi? Quiere que me comunique despues? Le dejo mi telefono *+5491140054474 - NICOLAS*')
  

    /*
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

/*

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
        
 */
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
        const adapterFlow = createFlow([flowPrincipal, flowVenta, flowsAlquiler, Menuflow])//Cliente, Menuflow, audiono, Menuflow2, alquila22])

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