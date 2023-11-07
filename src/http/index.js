const express = require('express')
const cors = require('cors')
const {join} = require('path')
const {createReadStream} = require('fs')

/**
 * Esta clase esta relacionada con todo lo que tiene que ver
 * con un endpoint o rutas de express para tener un punto de entrada
 * externo y flexible
 */
class ServerHttp {
    app;
    port;

    constructor(_port = 3001){
        this.port = _port
    }


    

    /**
     * Este el controlador del los enventos del Chatwoot
     * @param {*} req 
     * @param {*} res 
     */
        chatwootCtrl = async (req, res) => {
            const body = req.body;
            const attachments = body?.attachments
            const bot = req.bot;
          
                const phone = body.conversation?.meta?.sender?.phone_number.replace('+', '')
                const content = body?.content ?? '';

                const file = attachments?.length ? attachments[0] : null;
                if (file) {
                    console.log(`Este es el archivo adjunto...`, file.data_url)
                    await bot.providerClass.sendMedia(
                        `+${phone}@c.us`,
                        file.data_url,
                        content,
                        {})
                    };

            await bot.privider.sendtext(   `+${phone}@c.us`,
            content,
            {}
        );
                    await bot.providerClass.sendMessage(
                    `${phone}`,
                    content,
                    {}
                );

                
        this.app = express()
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use((req, _, next) => {
            req.bot = bot;
            next()
        })
        
        this.app.post(`/chatwoot`, this.chatwootCtrl)

    }
    

}

module.exports = ServerHttp