const { createBot, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { BaileysProvider } = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const { readFileSync } = require("fs")
const delay = (ms) => new Promise((res) => setTimeout(res, ms))
const fs = require("fs")

let motivo



////////////////////////////////////////////////////////////////////////////////////////////
////     FUNCIONES
/////////////////////////////////////////////////////////////////////////////////////////

function numero(nnum){
  let nuevoContenido = `\n${nnum}`
  fs.appendFile('numeros.txt', nuevoContenido, (err) => {
    if (err) throw err
    console.log('Numero Agendado de Venta')
  })
}

function numero2(nnum){
  let nuevoContenido = `\n${nnum}`
  fs.appendFile('numerosalquiler.txt', nuevoContenido, (err) => {
    if (err) throw err
    console.log('Numero Agendado de Alquiler')
  })
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////// FLUJO CLIENTE
////////////////////////////////////////////////////////////////////////////////////////////

const flujoAlquiler = addKeyword(['alquiler', 'alquilar', 'quiero alquilar'])
  .addAnswer('Perfecto! Para continuar, decime la fecha y ubicación del evento.')
  .addAction(async (ctx, { provider }) => {
    const mywhatsa = '5491131313131' // Reemplazar con número del agente
    motivo = 'ALQUILER'
    await provider.sendText(mywhatsa, `*${motivo}*\nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nFECHA Y UBICACION: ${ctx.body}`)
  })

const flujoVenta = addKeyword(['venta', 'comprar', 'quiero comprar'])
  .addAnswer('¡Genial! Para avanzar, contame tu consulta o lo que querés comprar.')
  .addAction(async (ctx, { provider }) => {
    const mywhatsa = '5491131313131'
    motivo = 'VENTA'
    await provider.sendText(mywhatsa, `*${motivo}*\nNumero: +${ctx.from}\nNombre: *${ctx.pushName}*\nMENSAJE: ${ctx.body}`)
  })

const main = async () => {
  const adapterDB = new JsonFileAdapter()
  const adapterFlow = createFlow([flujoAlquiler, flujoVenta])
  const adapterProvider = new BaileysProvider()

  await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })
}

main()

