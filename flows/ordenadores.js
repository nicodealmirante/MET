
module.exports = addKeyword('UNIFILA LED',{sensitive:true})
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

   .addAnswer("*MENU*", {capture: false, 
    buttons: [
        {body: 'CONTINUAR CON ASESOR'},
        {body: 'VOLVER AL MENU'}], delay: 2000}, async(ctx,{gotoFlow,flowDynamic,adapterProvider}) => {

if (ctx.body == 'CONTINUAR CON ASESOR') {
await adapterProvider.sendMessage(mywhatsa, `*UNIFILA* \nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nINFO: \n*${ctx.body}*`,{})

await  flowDynamic('UN AGENTE SE COMUNICARA CON USTED A LA BREVEDAD')

return gotoFlow(MENU)

} else if (ctx.body == 'VOLVER AL MENU') {

return gotoFlow(MENU)
}
}
     
)})