const { addKeyword, EVENTS,addAnswer} = require("@bot-whatsapp/bot");
const ChatWood = require("../http/services/chatwood.js");

module.exports =  addKeyword(['INFO. ALQUILER'], {sensitive: true})
         

.addAction(async(ctx,{flowDynamic}) => {
  const dataIn= {msg: ctx.body, mode: "incoming"}
  const abc = new ChatWood()
await abc.createMessage(dataIn)})
await abc.createMessage({msg: "👌Te envio la info de alquiler.\n*Espejo Mágico Selfie Mirror*\nDiseño elegante: Nuestro espejo mágico tiene un diseño moderno y elegante que se adapta a cualquier tipo de evento\n"+
+ '\nAccesorios y decoración: Contamos con una variedad de accesorios y elementos decorativos para personalizar aún '+                
                    'Su apariencia sofisticada agrega un toque especial al ambiente.'+
                    '\nAccesorios y decoración: Contamos con una variedad de accesorios y elementos decorativos para personalizar aún '+
                     'más la experiencia. Puedes elegir entre diferentes marcos, sombreros, anteojos, pizarras con mensajes divertidos' +
                      'y más. Estos elementos permiten que los invitados se diviertan y creen fotos únicas.'+
                    '\nTamaño y portabilidad: El espejo mágico tiene dimensiones compactas que facilitan su transporte e instalación en '+
                    'diferentes espacios. Es lo suficientemente versátil como para adaptarse a salones de eventos, fiestas en exteriores '+
                   'y otros lugares.'+
                   '\nOpciones de software: Nuestro espejo mágico viene con un software propio que ofrece una amplia gama de funciones '+
                   'y personalización. Puedes elegir entre diferentes plantillas de diseño, agregar efectos especiales a las fotos y configurar '+
                   'opciones de impresión según tus preferencias.'+
                   '\nTiempo de alquiler: El tiempo de alquiler del espejo mágico es flexible y se adapta a las necesidades de tu evento.'+
                   ' Puedes contratarlo por horas o por el tiempo que consideres necesario para brindar una experiencia completa a tus invitados.'+
                   '\nRecuerda que nuestros servicios incluyen el montaje, desmontaje y la asistencia de personal capacitado durante todo' +
                   'el evento. Estamos comprometidos en asegurar que tus invitados disfruten al máximo de la experiencia con el espejo mágico.'+
                   'Valor Servicio por 2 Horas $ 100.000 (base)'+
                   'El valor de la Hora adicional es de $ 50.000', mode: "outgoing"})        

                   await abc.createMessage({msg: '*360 Super Slow.*'+
                 '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.'+
                'Los videos son filmados y compartidos en el momento ya editados automáticamente'+
                'Incluye accesorios (pistola lanza burbujas, lanza billetes.)'+
               'El valor del servicio de 2 horas (2023) es de $ 100.000 .-'+
               'El valor del servicio de 2 horas (2024) es de U$s 100 .-'+
               'El valor de la Hora adicional (2023) es de $ 50.000 .-', mode: "outgoing"})        

       
               await abc.createMessage({msg: '🚚El valor no incluye traslados'+
             '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias', mode: "outgoing"}) 

             await abc.createMessage({msg: 'CONTINUUAR CON AGENTE, VOLVER AL MENU, FINALIZAR\n', mode: "outgoing"}) 
             .addAnswer("*CONTINUAR*", {capture: true, buttons: [
          {body: 'CONTINUAR CON AGENTE'},
          {body: 'VOLVER AL MENU'},
          {body: 'FINALIZAR'},
               ],delay: 3000 }, async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
                            console.log('ALQUILER')

if(ctx.body == 'CONTINUAR CON AGENTE'){
  await abc.createMessage({msg: 'CONTINUAR CON AGENTE', mode: "incoming"}) 
  return gotoFlow(alquila22)

  } else if(ctx.body == 'VOLVER AL MENU') {
    await abc.createMessage({msg: 'VOLVER AL MENU', mode: "incoming"}) 

        return gotoFlow(Menuflow)
  } else if (ctx.body == 'FINALIZAR') {
    await abc.createMessage({msg: 'GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.', mode: "incoming"}) 

       await flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
        return endFlow()
}
              }               )    

/////////// GOOGLE MAPS ___ CALCULO TRASLADOS
                 let fecha
                  let asd2;
                  let asd;
                 var res1;
                  var res2;
                  var total;
  const getTicket = async (donde) => {
      var config = { 
        method: "get",
          url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde.replace(' ','%20')}Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=AIzaSyB-o-yLjNarKluwNV8z8IZTDhosOlM1NOw` };
       const response = await axios(config)
        res1 = response.data["destination_addresses"][0]
             asd2 = response.data["rows"][0]["elements"][0]["duration"].text
               asd = Math.round(response.data["rows"][0]["elements"][0]["distance"].value/1000)
       total=(((asd*250)/3000)*3000)}


const alquila22 = addKeyword('alquilawer',{sensitive:true})  
        .addAnswer('Cual es la fecha del evento? Escriba en este formato (DD-MM-AAAA)',
                     {capture: true}, async(ctx) => {fecha=ctx.body})

        .addAnswer('Donde sería el evento? Escriba en este formato (LOCALIDAD - PROVINCIA)', 
                    {capture:true}, async (ctx, { endFlow, provider, flowDynamic}) => {

          await getTicket(ctx.body)
          await abc.createMessage({msg: traslados, mode: "outgoing"}) 

          var traslados = `*TRASLADOS*\nDISTANCIA: *${Math.round(asd)}* KM \nTIEMPO: *${asd2}*\nLUGAR: *${res1}*\nVALOR: *$ ${total}*.-\n*`
if((asd)<=200){ await flowDynamic(traslados)}

         const mywhatsa = "+5491140054474@s.whatsapp.net"
                provider.sendtext(mywhatsa, `*Alquiler* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body} \nFecha ${fecha}* \n\n ${traslados}`)
      await flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
          return endFlow(Menuflow)})


/////////////////////////////////////////////////////////////////////////////////




   