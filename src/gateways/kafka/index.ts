import { Consumer, Kafka, Producer } from 'kafkajs'

const clientId = 'kafka-payment'
const brokers = ['0.0.0.0:9092']

export const startKafka = () => {
    const kafka = new Kafka({ clientId, brokers })
    const producer = kafka.producer()
    const consumer = kafka.consumer({groupId: clientId})

    kafkaConsume(consumer, 'test-topic')
    return { consumer, producer }
}

export const kafkaNotify = async (producer: Producer, topic: string, payload: Object) => {
    await producer.connect()
    await producer.send({
        topic, messages: [{
            key: Date.now().toString(),
            value: JSON.stringify(payload)
        }]
    })
}

const kafkaConsume = async (consumer: Consumer, topic: string) => {
    await consumer.connect()
    await consumer.subscribe({topic, fromBeginning: true})
    await consumer.run({
        eachMessage: async ({message}) => {
            console.log(`received message ${message.value}`)
        }
    })
}