import {Kafka} from 'kafkajs';
import {env} from './../../config/config';

const {clientId} = env.kafka;
const brokers = [env.kafka.brokers];

const startKafka = () => {
	const kafka = new Kafka({clientId, brokers});

	const producer = kafka.producer();
	const consumer = kafka.consumer({groupId: clientId});

	return {consumer, producer};
};

export const kafkaNotify = async (topic: string, payload: Object) => {
	const {producer} = startKafka();

	await producer.connect();

	await producer.send({
		topic, messages: [{
			key: Date.now().toString(),
			value: JSON.stringify(payload),
		}],
	});
};

export const kafkaConsume = async (topic: string, callback: Function) => {
	const {consumer} = startKafka();

	await consumer.connect();
	await consumer.subscribe({topic, fromBeginning: true});

	await consumer.run({
		eachMessage: async ({message}) => {
			callback(message.value);
		},
	});
};
