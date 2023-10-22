const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const { readFileSync } = require("fs");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fs = require("fs")
const axios = require("axios");
const BotWrapper = require("./Services/class/botWrapper");

let motivo;  
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
.addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
    .addAnswer('Showroom', {media: 'video.mp4', delay: 4000})
    .addAnswer('Selfie Mirror', {media: 'video2.mp4'})
    .addAnswer('Captura 360', {media: 'video360.mp4'})
    .addAnswer("*ESTE CHAT AUTOMATICO FINALIZO.*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ],
  }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
          const mywhatsa = "5491140054474@s.whatsapp.net";

if (ctx.body == 'CONTINUAR CON AGENTE') {

await provider.sendtext(mywhatsa, `*${motivo}* \nNumero: +${ctx.from}\nNombre: *$*\nINFO: \n*${ctx.body}*`)
  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
await endFlow()

} else if (ctx.body == 'VOLVER AL MENU') {

 await gotoFlow(Menuflow)

  } else if (ctx.body == 'FINALIZAR') {
    flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
await endFlow()
}}
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
gotoFlow(Menuflow),
endFlow()})

///////////////////////////////////////////////////////////////// FLUJO ALQUILER


const flowsAlquiler = addKeyword(['//alqu-iler//'], {sensitive: true})
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
          
       

      .addAnswer(['🔒Los valores se congelan y la fecha se reserva solo al señar el servicio (2023)', 
             '🚚El valor no incluye traslados',
             '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias'],{capture:false}, async (ctx, {gotoFlow,endFlow,flowDynamic}) => {
       ///      numero2(ctx.from)
           motivo= "Alquiler";
    
 
    flowDynamic('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
     flowDynamic('Showroom', {media: 'video.mp4', delay: 4000});
      flowDynamic('Selfie Mirror', {media: 'video2.mp4'});
       flowDynamic('Captura 360', {media: 'video360.mp4'});
     flowDynamic("*ESTE CHAT AUTOMATICO FINALIZO.*", { 
            capture: true,
            buttons: [
                {body: 'CONTINUAR CON AGENTE'},
                {body: 'VOLVER AL MENU'},
                {body: 'FINALIZAR'},
            ],
        }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
                const mywhatsa = "5491140054474@s.whatsapp.net";
      
      if (ctx.body == 'CONTINUAR CON AGENTE') {
       await flowDynamic('En que fecha y donde se realizara el evento?') ,{capture: true},async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
            const mywhatsa = "5491140054474@s.whatsapp.net";

      await provider.sendtext(mywhatsa, `*${motivo}* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
        flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD' );
       endFlow()}
      } else if (ctx.body == 'VOLVER AL MENU') {
      
        gotoFlow(Menuflow)
      
        } else if (ctx.body == 'FINALIZAR') {
          await flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
       endFlow()
      }}
      )        
            }
      )




/////////////////////////////////////////////////////////////////////////////////////////// FLUJO VENTA


       
    .addAnswer(
        'OK',
        {
            capture: false
        },
        async (ctx, {provider}) => {
            const headerText = 'Selfie Mirror'
            const bodyText = '*Seleccione una opcion*'
            const footerText = 'Sistema Automatico FAQ'
            const buttonList = 'OPCIONES'
            const listParams = [
                {
                    title: '*VENTA*',
                    rows: [
                        {
                            id: 'ID_1',
                            title: 'ESPEJO MAGICO SELFIE MIRROR',
                            description: 'VENTA'
                        },
                        {
                            id: 'ID_2',
                            title: 'PLATAFORMA 360',
                            description: 'SUPER SLOW'
                        },
                        {
                            id: 'ID_3',
                            title: 'ORDENADORES DE FILA LED',
                            description: 'FILA VIP'
                        }
                    ]
                },
                        {
                  title: 'LA EMPRESA',
                  rows: [
                      {
                          id: 'ID_1',
                          title: 'UBICACION',
                          description: 'SHOWRROOM'
                      },
                      {
                          id: 'ID_2',
                          title: 'PAGINA WEB',
                          description: 'PORTALES DIGITALES'
                      },
                      {
                          id: 'ID_3',
                          title: 'HABLAR CON ASESOR',
                          description: 'WHATSAPP ASESOR'
                      }
                  ]
                },
            ]
            await provider.sendList(ctx.from, headerText, bodyText, footerText, buttonList ,listParams)
     

        })

  .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'},async(ctx,{flowDynamic})=>{
            if(ctx.body=='PAGINA WEB'){console.log('BIEN');
       if(ctx.body=='ESPEJO MAGICO SELFIE MIRROR'){console.log('BIEN2')}}})
            .addAnswer('👌 Te envío la info de Venta.')
            

            .addAnswer(['*Espejo Mágico Selfie Mirror*',
                    '\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
                    'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
                    'especiales.',
                   '\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
                   'Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
                    'y fiestas.'  ])


                    .addAnswer(['La facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el',
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

        .addAnswer('✈️ *Enviamos a todo el País*.', { capture: false }, async (ctx, {flowDynamic, gotoFlow, endFlow }
         ) => {
          let dolar
          await fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
    .then(json => dolar = json.venta)
                    motivo = "VENTA"  
                //   numero(ctx.from);
             
  flowDynamic(`*VALOR ESPEJO MAGICO* \n
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓 `);
     flowDynamic(`*VALOR PLATAFORMA 360*\n     
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓`);
  flowDynamic(`Cotizacion actual: \n💱[1 U$S = AR ${dolar}.-]💱`);
   flowDynamic('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'});

  flowDynamic('Showroom', {media: 'video.mp4', delay: 4000});
flowDynamic('Selfie Mirror', {media: 'video2.mp4'});
flowDynamic('Captura 360', {media: 'video360.mp4'});  
 flowDynamic("*ESTE CHAT AUTOMATICO FINALIZO.*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ],
  }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
          const mywhatsa = "5491140054474@s.whatsapp.net"}
 )
      
if (ctx.body == 'CONTINUAR CON AGENTE') {
 provider.sendtext(mywhatsa, `*${motivo}* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD');

} else if (ctx.body == 'VOLVER AL MENU') {

  gotoFlow(Menuflow) 

 } else if (ctx.body == 'FINALIZAR') {
    flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
 endFlow()
}   })
//////////////////////////////////////////////////////////////// EVENTO WELCOME
const organizadorflow = addKeyword('FLOWO¿¿RGAN',{sensitive:true})
.addAnswer(['¡Optimiza tus espacios y atrae la atención de tus clientes con nuestros organizadores de fila con tecnología Pixel LED!\n',
'En SELFIE MediaError, entendemos la importancia de mantener tus espacios organizados y atractivos. Nuestros organizadores de fila no solo te ayudarán a mantener un flujo ordenado de clientes, sino que también añadirán un toque de modernidad y estilo a tu negocio.\n',
'¿Qué hace que nuestros organizadores de fila con tecnología Pixel LED sean especiales?\n',
'✨ Iluminación espectacular: Nuestra tecnología Pixel LED ofrece una iluminación vibrante y personalizable que destacará tu marca y creará una experiencia memorable para tus clientes.\n',
'🧹 Organización efectiva: Mantén tus filas en orden y |evita la confusión con nuestros organizadores de alta calidad. ¡El caos será cosa del pasado!\n',
'🎨 Personalización total: Personaliza la apariencia de tus organizadores para que se adapten a tu imagen corporativa o al tema de tu negocio.\n',
'🌟 Destaca entre la multitud: Con nuestros organizadores de fila Pixel LED, tu negocio destacará en cualquier entorno, desde eventos, ferias comerciales hasta tiendas minoristas y restaurantes.\n',
'¡Es el momento de darle a tu negocio una ventaja competitiva!\n',
'¡Haz que tu negocio brille con nuestros organizadores de fila Pixel LED! 💫✨ #TecnologíaLED #OrganizaciónEfectiva #AtraeClientes\n',
'*VALORES*\n',
'*FILA VIP LED 80.000 AR$ C/U*\n',
'*CADENA 1.5 mts $ 10.000 AR$*\n',
'*SOGA 1.5 mts $ 20.000 AR$*\n',
'*PRODUCCION ACTUAL (7/10 DIAS)*\n',
'*POR FAVOR COMUNIQUESE AL +5491140054474 PARA CONTINUAR*'], {capture:false}, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
 flowDynamic('FILA VIP', {media: 'ledselfie.mp4'});
await flowDynamic('FOTO FILA VIP', {media: '111.jpg'});

})


//////////////////////////////////////////////////////////////// EVENTO WELCOME


  const flowPrincipal = addKeyword(EVENTS.WELCOME)  
  .addAnswer("Hola, gracias por comunicarte con Selfie Mirror. Esta es una línea de respuestas automáticas. Responde con el número índice para continuar o continua al\n +5491140054474 - Nicolás")
    .addAnswer("Presentamos los nuevos organizadores de fila *FILA VIP* - Completamente unicos y originales. Otro producto innovador de Selfie Mirror.")
    const flowVenta = addKeyword(['VE-NTA'], { sensitive: true })
       
    const flowServices = addKeyword('hola')
    .addAnswer(
        'Aqui va un mensaje',
        {
            capture: true
        },
        async (ctx, {provider}) => {
            const headerText = 'Selfie Mirror'
            const bodyText = 'Seleccione una opcion'
            const footerText = 'Canal de respuestas automaticas'
            const buttonList = 'OPCIONES'
            const listParams = [
                {
                    title: 'Equipos',
                    rows: [
                        {
                            id: 'ID_1',
                            title: 'Espejo Selfie Mirror',
                            description: 'Alquiler y Venta'
                        },
                        {
                            id: 'ID_2',
                            title: 'Plataforma 360 - Super Slow',
                            description: 'Alquiler y Venta'
                        },
                        {
                            id: 'ID_3',
                            title: 'Organizadores de fila PIXEL',
                            description: 'SOLO VENTA'
                        }
                    ]
                },
                {
                    title: 'Sobre Selfie Mirror',
                    rows: [
                        {
                            id: 'ID_1',
                            title: 'Ubicacion',
                            description: 'ShowRoom'
                        },
                        {
                            id: 'ID_2',
                            title: 'Medios ONLINE',
                            description: 'Sitios Web'
                        },
                        {
                            id: 'ID_3',
                            title: 'Horarios',
                            description: 'Siempre con cita.'
                        }
                    ]
                }
            ]
            await provider.sendList(ctx.from, headerText, bodyText, footerText, buttonList ,listParams)
        }
    )     
  
  
    .addAnswer('Plataforma 360 Super Slow', {media: 'banner.jpg'},async(ctx,{flowDynamic})=>{
       
    
    
    if(ctx.body=='PAGINA WEB'){console.log('BIEN');
       if(ctx.body=='ESPEJO MAGICO SELFIE MIRROR'){console.log('BIEN2')}}})
            .addAnswer('👌 Te envío la info de Venta.')
            

            .addAnswer(['*Espejo Mágico Selfie Mirror*',
                    '\nEl Espejo Mágico de Selfie Mirror cuenta con una cámara web de alta calidad, vidrio templado resistente, una Mini PC y un',
                    'televisor LED de 32 pulgadas. Estas características garantizan una experiencia de alta definición para capturar momentos',
                    'especiales.',
                   '\nSu diseño compacto y portátil, con dimensiones de 126 cm de alto x 70 cm de ancho y 20 cm de profundidad en el modelo',
                   'Slim, permite transportarlo fácilmente en cualquier vehículo. Esto brinda una gran versatilidad y conveniencia para eventos ',
                    'y fiestas.'  ])


                    .addAnswer(['La facilidad de uso es una de las ventajas clave del Espejo Mágico. Simplemente tienes que enchufarlo y presionar el',
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

        .addAnswer('✈️ *Enviamos a todo el País*.', { capture: false }, async (ctx, {flowDynamic, gotoFlow, endFlow }
         ) => {
          let dolar
          await fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
    .then(json => dolar = json.venta)
                    motivo = "VENTA"  
                //   numero(ctx.from);
             
  flowDynamic(`*VALOR ESPEJO MAGICO* \n
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓 `);
     flowDynamic(`*VALOR PLATAFORMA 360*\n     
💵   *U$D 1,500 .-*   🔒
💱 > U$D = AR$ > 💱
📈 AR$ ${new Intl.NumberFormat('es-MX').format(dolar*1500)} .-🔓`);
  flowDynamic(`Cotizacion actual: \n💱[1 U$S = AR ${dolar}.-]💱`);
   flowDynamic('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'});

  flowDynamic('Showroom', {media: 'video.mp4', delay: 4000});
flowDynamic('Selfie Mirror', {media: 'video2.mp4'});
flowDynamic('Captura 360', {media: 'video360.mp4'});  
 flowDynamic("*ESTE CHAT AUTOMATICO FINALIZO.*", { 
      capture: true,
      buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
      ],
  }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
          const mywhatsa = "5491140054474@s.whatsapp.net"}
 )
      
if (ctx.body == 'CONTINUAR CON AGENTE') {
 provider.sendtext(mywhatsa, `*${motivo}* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`)
  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD');

} else if (ctx.body == 'VOLVER AL MENU') {

  gotoFlow(Menuflow) 

 } else if (ctx.body == 'FINALIZAR') {
    flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
 endFlow()
}   })


                    


  /////////////////////////////////////////////////////////////////////////  FLUJO MENU
  
/** const Menuflow = addKeyword(["me-nu"], { sensitive: true })

  .addAnswer("*MENU*", { 
            capture: true,
            buttons: [
                {body: 'INFO. ALQUILER'},
                {body: 'INFO. VENTA'},
                {body: '+ OPCIONES'},
            ],
         delay: 5000 }, async (ctx, { fallBack, gotoFlow, provider, sock}) => {
    
    if (ctx.body == 'INFO. ALQUILER') {
      await   gotoFlow(flowsAlquiler)
      } else if (ctx.body == 'INFO. VENTA') {
       await  gotoFlow(flowVenta)
        } else if (ctx.body == '+ OPCIONES') {
          await  gotoFlow(Menuflow2)
    }}
) 

  const Menuflow2 = addKeyword(["me-?nu"], { sensitive: true })

  
     .addAnswer("Menu", { 
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
         gotoFlow(Cliente)
      } else if (ctx.body == 'INFO DE LA EMPRESA') {
        flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
        flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
   
        flowDynamic('Selfie Mirror', {media: 'video.mp4'})
      
        gotoFlow(Menuflow);
         
             } else {
           fallBack({ body: 'Esta respuesta es automática y solo acepta una respuesta numérica. Responde 1 para *Alquiler*, 2 para *Venta* o 3 para derivarlo a un *Asesor*. Gracias' });
           }   [flowVenta, flowsAlquiler, Cliente]});
        
*/
////////////////////////////////////////////////////////////////////////////////////////
        
  const main = async () => {



    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowsAlquiler, Cliente,  audiono,organizadorflow])
    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: 'EAAMziR3dWTwBOyI5iwUFZCeBqo2F3yZCvipXQlqUxlvtQkb122Sc91lLMJvZC72DobxvZBwO4lXWIdJ4FCTMISIqfpEPtxbWC9zkeffcbBU7W2Dn9cefzdRNDQEmdma9nxsmz6WfFKsK9Es7RwuZAteGov0mIZA0WPlusxgmmJNpcydS37cmjNa558ETrgfbIkQJJaba4Cv5ZCu8GZAe',
        numberId: '133862353148114',
        verifyToken: 'asdasd',
        version: 'v16.0',
    })
 
   createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  }); 
/** 
  BotWrapper.initialize(BotCreate, {
    CHATWOOT_URL: "https://chatwoot-production-36d7.up.railway.app/webhooks/whatsapp/+541166704322",
    CHATWOOT_ID: "1",
    CHATWOOT_INBOX_ID: "",
    CHATWOOT_API_ACCESS_TOKEN: "a19cc4f38d1c129044b376f5a89d90c7",
 /*/
     
       
    }
 main()

