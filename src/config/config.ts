import {config} from 'dotenv';

config();

export const env = {
	kafka: {
		clientId: process.env.KAFKA_CLIENT_ID,
		brokers: process.env.KAFKA_BROKERS,
	},
};
