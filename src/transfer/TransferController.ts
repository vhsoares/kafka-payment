import {NextFunction, Request, Response} from 'express';
import {kafkaNotify} from '../gateways/kafka';

export const TransferController = {
	sendMoney: (request: Request, response: Response, next: NextFunction) => {
		const {payerId, payerSecret, value, receiverPublicCode} = request.body;

		// Todo Entidade e criação da requisição utilizando os dados recebidos passar o uuid pra notificação do kafka

		try {
			kafkaNotify('transfer-requested', {});
			response.status(200).send({message: 'Transfer request placed succesfully'});
			next();
		} catch (error) {
			next(error);
		}
	},

	revertTransfer: (request: Request, response: Response, next: NextFunction) => {
		const {value} = request.body;
		console.log(value);
		response.sendStatus(200);
		next();
	},
};

