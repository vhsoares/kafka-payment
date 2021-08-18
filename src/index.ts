import 'reflect-metadata';
import {createConnection} from 'typeorm';
import startServer from './server';
import TransferRouter from './transfer/TransferRouter';
import UserRouter from './user/UserRouter';
import {handleErrors} from './utils';

createConnection().then(async connection => {
	const server = startServer();

	server.use('/user', UserRouter);
	server.use('/transfer', TransferRouter);

	server.use(handleErrors);
	server.listen(3000);
}).catch(error => console.log(error));
