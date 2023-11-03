const { addKeyword, EVENTS,addAnswer} = require("@bot-whatsapp/bot");
const ChatWood = require("../http/services/chatwood.js");

module.exports = addKeyword(EVENTS.WELCOME)
    .addAction(async(ctx,{flowDynamic}) => {
        const dataIn= {msg: ctx.body, mode: "incoming"}
        const abc = new ChatWood()
      await abc.createMessage(dataIn)
   await   flowDynamic("Hola, gracias por comunicarte con Selfie Mirror. Esta es una línea de respuestas automáticas. Responde con el número índice para continuar o continua al\n +5491140054474 - Nicolás")
    await abc.createMessage({msg: "Hola, gracias por comunicarte con Selfie Mirror. Esta es una línea de respuestas automáticas. Responde con el número índice para continuar o continua al\n +5491140054474 - Nicolás ", mode: "outgoing"})
      await abc.createMessage({msg: "Opciones \n INFO. ALQUILER\nINFO. VENTA\n UNIFILA LED", mode: "outgoing"})
      await abc.createMessage({msg: "Contacto \n HABLAR CON ASESOR\nINFO DE LA EMPRESA\n PAGINA WEB", mode: "outgoing"})})

      .addAnswer("Opciones", {capture: false, 
              buttons: [
          {body: 'INFO. ALQUILER'},
          {body: 'INFO. VENTA'},
          {body: 'UNIFILA LED'}, 
      ], delay: 2000 })
.addAnswer("*Contacto*", { capture: true,
              buttons: [
          {body: 'HABLAR CON ASESOR'},
          {body: 'INFO DE LA EMPRESA'},
          {body: 'PAGINA WEB'},
      ],    delay: 3000 }
       )
       .addAction(async(ctx,{flowDynamic}) => {
   
    dataIn= {msg: ctx.body, mode: "incoming"}
      await abc.createMessage(dataIn)
if (ctx.body == 'PAGINA WEB') {
 await flowDynamic('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar')  
 await flowDynamic('FILA VIP \nhttps://filavip.ar')  
       return gotoFlow(Menuflow);

} else if (ctx.body == 'HABLAR CON ASESOR') {
nombre = "Cliente"
return gotoFlow(Cliente)

} else if (ctx.body == 'INFO DE LA EMPRESA') {
await flowDynamic('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires*' )
await flowDynamic('  Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
 await flowDynamic('Selfie Mirror', {media: 'video.mp4'})
return  gotoFlow(Menuflow)}
if (ctx.body == 'PAGINA WEB') {
     
      const msj = ('SELFIE MIRROR \nhttps://www.espejoselfiemirror.com.ar\n FILA VIP \nhttps://filavip.ar')      
    } else if (ctx.body == 'INFO DE LA EMPRESA') {
      const msj = ('*Av de Mayo 1624  - RAMOS MEJÍA - Buenos Aires\n Nuestros horarios de atención son: de Lunes a Viernes de 10hs a 17hs' )
  } 

    await abc.createMessage({msg: msj, mode: "outgoing"})  }
) 

   