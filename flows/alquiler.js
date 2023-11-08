const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const axios = require (axios)
const alquiler = addKeyword(['INFO. ALQUILER'], {sensitive: true})
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
   
          .addAnswer('Selfie Mirror 360 + Selfie',{media: 'dibu.jpg'})
 
            .addAnswer('Showroom', {media: 'video.mp4'})

          .addAnswer('Selfie Mirror', {media: 'video2.mp4'})

         .addAnswer('Captura 360', {media: 'video360.mp4'})


.addAnswer("*MENU*", {capture: false, 
 buttons: [
     {body: 'CONTINUAR CON ASESOR'},
     {body: 'VOLVER AL MENU'}], delay: 2000}, async(ctx,{gotoFlow,flowDynamic,adapterProvider}) => {

if (ctx.body == 'CONTINUAR CON ASESOR') {
flowDynamic('Cual es la fecha del evento? Escriba en este formato (DD-MM-AAAA)', {capture: true}, async(ctx,{}) => {fecha=ctx.body})

flowDynamic('Donde sería el evento? Escriba en este formato (LOCALIDAD - PROVINCIA)', {capture:true}, async (ctx, { endFlow, provider, flowDynamic}) => {

const KEYGOOGLE = process.env.google;         

       let fecha; let asd2; let asd; var res1; var res2; var total;

           const getTicket = async (donde) => { var config = {

                method: "get",

                     url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${donde.replace(' ','%20')}Argentina&origins=Ramos%20Mejia%20Buenos%20Aires%20Argentina&key=${KEYGOOGLE}`}

                             const response = await axios(config)

                  
                   /////////////// DESTINO ENCONTRADO POR GOOGLE
                   res1 = response.data["destination_addresses"][0]


                    ////////////// TIEMPO DE VIAJE


                   asd2 = response.data["rows"][0]["elements"][0]["duration"].text


                   ///////////////////// DISTANCIA EN METROS / 1000 = KM ///////////////////////

                   asd = Math.round(response.data["rows"][0]["elements"][0]["distance"].value/1000)

                   ///////////////////// KM X 250 = MULTIPLOS DE 3000 REDONDO //////////////////
                  total=(((asd*250)/3000)*3000)}})

                    .addAction(async (ctx, { adapterProvider, gotoFlow, flowDynamic}) => { 
                 
                 
                      await getTicket(ctx.body)

                  var traslados = `*TRASLADOS*\nDISTANCIA: *${Math.round(asd)}* KM \nTIEMPO: *${asd2}*\nLUGAR: *${res1}*\nVALOR: *$ ${total}*.-\n*`


                 await flowDynamic(traslados)
                    await adapterProvider(mywhatsa, `*Alquiler* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body} \nFecha ${fecha}* \n\n ${traslados}`,{})
                     await flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')})
           

return gotoFlow(MENU)

} else if (ctx.body == 'VOLVER AL MENU') {

return gotoFlow(MENU)
}
}
  
)
module.exports= { alquiler} 