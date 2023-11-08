const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const venta = addKeyword('INFO. VENTA',{sensitive: true})

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
          '\nEn cuanto al precio, el valor del equipo es de 1500 dólares o pesos al valor del dólar blue del día.'])
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
  
.addAnswer('✈️ *Enviamos a todo el País*.', 
{ capture: false }, async (ctx, { flowDynamic,gotoFlow, endFlow }) => { let dolar

//>>>>>>>>>>>>>>>>>>>>>>>>>> CAMBIO DOLAR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

await fetch('https://dolarapi.com/v1/dolares/blue')
    .then(response => response.json())
          .then(json => dolar = json.venta)

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

                        .addAnswer("*MENU*", {capture: false, 
                                  buttons: [
                                      {body: 'CONTINUAR CON ASESOR'},
                                      {body: 'VOLVER AL MENU'}], delay: 2000}, async(ctx,{gotoFlow,flowDynamic,adapterProvider}) => {

                        if (ctx.body == 'CONTINUAR CON ASESOR') {
                          await adapterProvider.sendMessage(mywhatsa, `*VENTA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`,{})

                        await  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')
                        
                        return gotoFlow(MENU)
                        
                        } else if (ctx.body == 'VOLVER AL MENU') {
                        
                         return gotoFlow(MENU)
                          }
                        }
                                   
                        )})
                        module.exports= { ordenadores} 