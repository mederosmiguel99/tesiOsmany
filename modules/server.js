'use stric'

const debug = require('debug')('piston:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')

const pistonUtils = require('piston-utils')
const utils = pistonUtils()
const configDb = utils.configDb

const db = require('piston-db')

let device, metric
const clients = new Map();
const topicsRegist = []

const pubsubsettings = {
    type: redis,
    redis,
    db: 0,
    puerto: 6379,
    return_buffers: true,  // para manejar cargas útiles binarias 
    host: "localhost"
}

const moscaSettings = {
    port: 1883, 			// mosca (mqtt) port 
    backend: pubsubsettings 	// pubsubsettings es el objeto que creamos arriba
}

var server = new mosca.Server(moscaSettings);	//// aquí iniciamos el servidor

server.on('ready', async () => {

    let services = await db(configDb).catch((e) => { debug(e) })
    device = services.deviceConsult
    metric = services.metricConsult

    console.log(`${chalk.green('[piston-mqtt]')} server is runnig`);

});

server.on('clientConnected', (client) => {
    debug(`Client Connected:${client.id}`)
    clients.set(client.id, null)
    //device.createOrUpdate(client)
})


server.on('published', async (packet, client) => {
    if (packet.topic == 'device/publish') {
        debug(`Topic: ${packet.topic}`)
    }
    switch (packet.topic) {
        case 'device/connected':
        case 'device/disconnected':
      /*  case 'device/publish':
            debug(`Payload published: ( ${packet.payload} )`)
            const payload = utils.Json.parseToJson(packet.payload)

            if (payload) {
                payload.deviceTopic = packet.topic
                server.publish({
                    topic: '!sendToWeb!',
                    payload: JSON.stringify(payload)
                })

                ///Almacenar Devices
                payload.device.connected = true;

                let device_

                try {
                    device_ = await device.createOrUpdate(payload.device)
                } catch (e) {
                    return handleFatalError(e)
                }

                debug(`device published: ( ${device_})`)

                if (!clients.get(client.id)) {
                    //Asignarle un agente a este cliente de mqtt
                    clients.set(client.id, device_)
                }


                ///Almacenar Metrics
                for (const metric_ of payload.metrics) {
                    let met
                    debug(`Metric ${metric_} saved on agent ${device_.uuid}`)

                    try {
                        met = await metric.create(device_.uuid, metric_)
                    } catch (e) {
                        return handleError(e)
                    }
                }

            } else {
                debug(`The payload is empty`)
            }
            break*/
        case "turnOn":
            debug("turnOn")
            server.publish({
                topic: "turn",
                payload: packet.payload
            })
            break
        case "subscribe":
            break
        default:
            debug("DEFAUT")
            ///Ir guardando los topicos en una lista para no tener que hacer el publish si ya existe el topico
            debug(packet.topic)
            const topicType = packet.topic.split("/")[0]
            debug("Desde web viene "+topicType)
            if (topicType === "fromweb") {
                debug("Envio para el arduino "+packet.payload)
                server.publish({
                    topic: packet.topic.split("/")[1],
                    payload: packet.payload
                })
            } else {
                    server.publish({
                        topic: "subscribe", 
                        payload: packet.topic
                    })
                

                debug(`Payload published: ( ${packet.payload} )`)
                const payload = utils.Json.parseToJson(packet.payload)

                if (payload && payload.device) {
                    /*payload.deviceTopic = packet.topic
                    server.publish({
                        topic: '!sendToWeb!',
                        payload: JSON.stringify(payload)
                    })*/
                    ///Almacenar Devices
                    payload.device.connected = true; 

                    let device_

                    try {
                        device_ = await device.createOrUpdate(payload.device)
                    } catch (e) {
                        return handleFatalError(e)
                    }

                    debug(`device published: ( ${device_})`)
                    debug(`${client}`)
                   /* if (!clients.get(client.id)) {
                        //Asignarle un agente a este cliente de mqtt
                        clients.set(client.id, device_)
                    }*/


                    ///Almacenar Metrics
                    for (const metric_ of payload.metrics) {
                        let met
                        debug(`Metric ${metric_} saved on agent ${device_.uuid}`)

                        try {
                            met = await metric.create(device_.uuid, metric_)
                        } catch (e) {
                            return handleError(e)
                        }
                    }

                } else {
                    debug(`The payload is empty`)
                }
            }

    }
})

server.on('clientDisconnected', async (client) => {
    debug(`Client Disconnected ${client.id}`)
    const device_ = clients.get(client.id)

    if (device_) {
        device_.connected = false
        try {
            await device.createOrUpdate(device_)
        } catch (e) {
            handleFatalError(e)
        }

        clients.delete(client.id)
        debug(`Client(${client.id}) associated to Agent (${device.uuid}) marked a disconnected`)
    }
})




server.on('error', handleFatalError)

function handleFatalError(err) {
    console.error(`${chalk.red('[fatal error')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

function handleError(err) {
    console.error(`$${chalk.red('[fatal error')} ${err.message}`)
    console.error(err.stack)
}



process.on('uncaugthException', handleFatalError)
process.on('unhandleRejection', handleFatalError)







