const { addKeyword, EVENTS,addAnswer} = require("@bot-whatsapp/bot")
const ChatWood = require("../http/services/chatwood.js");
const axios = require("axios");
const { addAction } = require("./alquiler.js");

let fecha
let asd20;
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

module.exports =  addKeyword(['INFO. ALQUILER'], {sensitive: true})
.addAnswer('👌Te envio la info de alquiler.')
.addAnswer('imagen',  {media: 'http://gs.invitarme.com.ar/banner22.jpg'})
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
         'El valor de la Hora adicional es de $ 50.000'
        ])

.addAnswer('Espejo Mágico Selfie Mirror', {media: 'http://gs.invitarme.com.ar/banner3.jpg'})


.addAnswer(['*360 Super Slow.*',
       '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.',
      'Los videos son filmados y compartidos en el momento ya editados automáticamente',
      'Incluye accesorios (pistola lanza burbujas, lanza billetes.)',
     'El valor del servicio de 2 horas (2023) es de $ 100.000 .-',
     'El valor del servicio de 2 horas (2024) es de U$s 100 .-',
     'El valor de la Hora adicional (2023) es de $ 50.000 .-'])  

.addAnswer('Plataforma 360 Super Slow', {media: 'http://gs.invitarme.com.ar/banner.jpg'})

.addAnswer(['🚚El valor no incluye traslados',
   '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias'])

   .addAnswer('Selfie Mirror 360 + Selfie',{media: 'http://gs.invitarme.com.ar/dibu.jpg'})

   .addAnswer('Showroom', {media: 'http://gs.invitarme.com.ar/video.mp4'})
   .addAnswer('Selfie Mirror', {media: 'http://gs.invitarme.com.ar/video2.mp4'})
   .addAnswer('Captura 360', {media: 'http://gs.invitarme.com.ar/video360.mp4'})
   .addAnswer("*OPCIONES*", {capture: true, buttons: [
{body: 'CONTINUAR CON AGENTE'},
{body: 'VOLVER AL MENU'},
{body: 'FINALIZAR'},
     ],delay: 3000 })
     
     .addAction(async (ctx, { endFlow, gotoFlow, provider, flowDynamic}) => {
          const dataIn= {msg: ctx.body, mode: "incoming"}
        await abc.createMessage(dataIn)
        await abc.createMessage({msg: '👌Te envio la info de alquiler.\n*Espejo Mágico Selfie Mirror*\nDiseño elegante Nuestro espejo mágico tiene un diseño moderno y elegante que se adapta a cualquier tipo de evento\n'+
        '\nAccesorios y decoración Contamos con una variedad de accesorios y elementos decorativos para personalizar aún '+                
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
                           'El valor de la Hora adicional es de $ 50.000'+
                          '*360 Super Slow.*'+
                         '\nEl servicio dura 2 horas. Durante ese tiempo no existe límite de capturas.'+
                        'Los videos son filmados y compartidos en el momento ya editados automáticamente'+
                        'Incluye accesorios (pistola lanza burbujas, lanza billetes.)'+
                       'El valor del servicio de 2 horas (2023) es de $ 100.000 .-'+
                       'El valor del servicio de 2 horas (2024) es de U$s 100 .-'+
                       'El valor de la Hora adicional (2023) es de $ 50.000 .-'+      
                  ' 🚚El valor no incluye traslados' +
                     '🚩*Servicio disponible para todo el país.* Contamos con representantes en todas las provincias'+
        
                   'CONTINUUAR CON AGENTE, VOLVER AL MENU, FINALIZAR\n', mode: "outgoing"})
                     

////////////////
if(ctx.body == 'CONTINUAR CON AGENTE'){
  await abc.createMessage({msg: "Continuar con Agente", mode: "incoming"})
  return gotoFlow(contactoalquiler)
} else if(ctx.body == 'VOLVER AL MENU') {
  await abc.createMessage({msg: "Volver al MENU", mode: "incoming"})
return gotoFlow(Menuflow)
} else if (ctx.body == 'FINALIZAR') {
  await abc.createMessage({msg: "Finalizar", mode: "incoming"})
await flowDynamic('GRACIAS POR COMUNICARSE CON NOSOTROS. QUEDAMOS A SUS ORDENES.')
return endFlow()

    }      })        

/////////// GOOGLE MAPS ___ CALCULO TRASLADOS
    



//////////////////////



/////////////////////////////////////////////////////////////////////////////////




   