const express = require('express')
const cors = require('cors')
const {join} = require('path')
const {createReadStream} = require('fs')

/**
 * Esta clase esta relacionada con todo lo que tiene que ver
 * con un endpoint o rutas de express para tener un punto de entrada
 * externo y flexible
 */


  
    /**
     * Incia tu server http sera encargador de injectar el instanciamiento del bot
     */
    initialization  => {
        app = express()
        app.use(express.json())

app.listen(4000, () => {
             console.log("asd")
   const body = req.body;
        const attachments = body?.attachments
        const app = req.bot;

        try {

            const mapperAttributes = body?.changed_attributes?.map((a) => Object.keys(a)).flat(2)

            /**
             * Esta funcion se encarga de agregar o remover el numero a la blacklist
             * eso quiere decir que podemos hacer que el chatbot responda o no
             * para que nos sirve, para evitar que el chatbot responda mientras
             * un agente humano esta escribiendo desde chatwoot
             */
            if (body?.event === 'conversation_updated' && mapperAttributes.includes('assignee_id')) {
                const phone = body?.meta?.sender?.phone_number.replace('+', '')
                const idAssigned = body?.changed_attributes[0]?.assignee_id?.current_value ?? null
        
                if(idAssigned){
                    bot.dynamicBlacklist.add(phone)
                }else{
                    bot.dynamicBlacklist.remove(phone)
                }
                res.send('ok')
                return
            }

            /**
             * La parte que se encarga de determinar si un mensaje es enviado al whatsapp del cliente
             */
            const checkIfMessage = body?.private == false && body?.event == "message_created" && body?.message_type === "outgoing"
            if (checkIfMessage) {
                const phone = body.conversation?.meta?.sender?.phone_number.replace('+', '')
                const content = body?.content ?? '';
     console.log(content)
                const file = attachments?.length ? attachments[0] : null;
                if (file) {
                    console.log(`Este es el archivo adjunto...`, file.data_url)
                    await bot.provider.sendMedia(
                        `${phone}@c.us`,
                        file.data_url,
                        content,
                    );
                    res.send('ok')
                    return
                }
        


                /**
                 * esto envia un mensaje de texto al ws
                 */
               await bot.provider.sendtext(
                    `${phone}`,
                    content,
                   {}
                );

                res.send('ok');
                return;
               
            }

            res.send('ok')
        } catch (error) {
            console.log(error)
            return res.status(405).send('Error')
        }
    }
)

}


