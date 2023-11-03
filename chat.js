const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

require('dotenv').config();

const apiBaseUrl = "https://chatwoot-production-0566.up.railway.app";
const apiVersion = "v1";
const accountId = "1";
const token = "mS5dKUsvKEYVn2zBUx6y6C32";
const inboxId = "1";

const headersMedia= new Headers();
headersMedia.append("api_access_token", token);
headersMedia.append("Content-Type", "multipart/form-data");

const headers = new Headers();
headers.append("api_access_token", token);
headers.append("Content-Type", "application/json");

const buildApiUrl = (endpoint) => {
    return `${apiBaseUrl}/api/${apiVersion}/accounts/${accountId}/${endpoint}`;
};

const obtenerInformacionConversaciones = async (name, phone, msg = "", message_type = "") => {
    return procesarConversacion(name, phone, msg, message_type, "input_email");
};

const enviarImagenes = async (filePath, name, phone, CAPTION, message_type = "incoming") => {
    return procesarConversacion(name, phone, CAPTION, message_type, "audio", filePath);
};

const procesarConversacion = async (name, phone, content, message_type, file_type, filePath) => {
    if (!phone) {
        console.log("El número de teléfono no está definido.");
        return null;
    }

    try {
        const formattedPhoneNumber = `+${phone}`;
        const conversationsUrl = buildApiUrl("conversations");

        const response = await fetch(conversationsUrl, {
            method: "GET",
            headers: headers
        });

        if (!response.ok) {
            console.error("Error al obtener la información de conversaciones:", response.statusText);
            return null;
        }

        const responseData = await response.json();
        let foundId = null;

        responseData.data.payload.some((conversation) => {
            if (conversation.meta.sender.phone_number === formattedPhoneNumber) {
                foundId = conversation.id;
                return true;
            }
            return false;
        });

        if (!foundId) {
            console.log("No se encontró un ID asociado al número de teléfono. Creando un contacto...");

            const contactData = {
                name: name || "contact 1",
                phone_number: formattedPhoneNumber,
                source_id: formattedPhoneNumber
            };

            const createContactUrl = buildApiUrl("contacts");
            const createContactResponse = await fetch(createContactUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(contactData)
            });

            if (!createContactResponse.ok) {
                console.error("Error al crear un contacto:", createContactResponse.statusText);
                return null;
            }

            const createContactData = await createContactResponse.json();
            const createdContactId = createContactData.payload.contact.id;

            const conversationData = {
                inbox_id: inboxId,
                contact_id: createdContactId
            };

            const sendConversationUrl = buildApiUrl("conversations");
            const sendConversationResponse = await fetch(sendConversationUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(conversationData)
            });

            if (sendConversationResponse.ok) {
                const sendConversationData = await sendConversationResponse.json();
                console.log("Respuesta exitosa al enviar la conversación:", sendConversationData);
                await procesarConversacion(name, phone, content, message_type, file_type, filePath);
            } else {
                console.error("Error en la solicitud al enviar la conversación:", sendConversationResponse.statusText);
            }
        } else {
            console.log("ID asociado al número de teléfono:", foundId);
        }

        const sendMessageUrl = buildApiUrl(`conversations/${foundId}/messages`);
        const data = new FormData();

        if (filePath) {
            data.append('attachments[]', fs.createReadStream(filePath));
        }

        data.append('private', 'true');
        data.append('content', content);
        data.append('message_type', message_type);
        data.append('file_type', file_type);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: sendMessageUrl,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary',
                'api_access_token': token,
                ...data.getHeaders()
            },
            data: data
        };

        const sendMessageResponse = await axios.request(config);

        if (sendMessageResponse.status === 200) {
            //console.log("Respuesta exitosa al enviar el mensaje:", sendMessageResponse.data);
        } else {
            console.error("Error en la solicitud al enviar el mensaje:", sendMessageResponse.statusText);
            //console.error("El path es:", filePath);
        }

        return foundId;
    } catch (error) {
        console.error("Error al obtener la información de conversaciones o al enviar el mensaje:", error.message);
        return null;
    }
};


module.exports = { obtenerInformacionConversaciones, enviarImagenes };