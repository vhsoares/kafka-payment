import { NextFunction, Request, Response } from 'express';
import md5 from 'md5';

import { User } from '../entity/UserEntity';
import { Wallet } from '../entity/WalletEntity';

export const UserController = {
	createUser: async (request: Request, response: Response, next: NextFunction) => {
		const { name, cpf, email, secret, balance = 0 } = request.body;
		try {
			const user = new User();

			user.name = name;
			user.cpf = cpf;
			user.email = email;
			user.secret = md5(secret);
			user.active = true;

			user.wallet = new Wallet();
			user.wallet.balance = balance;

			await user.save();

			response.status(200).send({ message: 'user successfully created', userId: user.id });
		} catch (e) {
			response.status(500).send({ message: 'Could not insert this User into system', error: e });
		}

		return next();
	},

	getUser: async (request: Request, response: Response) => {
		const { cpf, secret } = request.params;
		try {
			const user = await User.findOneOrFail({ where: { cpf, secret: md5(secret) } });
			user.secret = undefined;
			return response.status(200).send({ content: { user } });
		} catch {
			return response.status(404).send({ message: 'User not found' });
		}
	},

	getUserBallance: (request: Request, response: Response, next: NextFunction) => {
		const { cpf, secret } = request.params;
		try {
			const user = await User.findOneOrFail({ where: { cpf, secret: md5(secret), active: true\ } });
			user.secret = undefined;
			response.status(200).send({ content: { user } });
		} catch {
			return response.status(404).send({ message: 'User not found' });
		}

		next();
	},

	getUserTransactions: (request: Request, response: Response, next: NextFunction) => {

	},

	deleteUser: (request: Request, response: Response, next: NextFunction) => {
		try {
			const { cpf, secret } = request.params;
			const user = await User.findOneOrFail({ where: { cpf, secret: md5(secret) } });
			user.active = false;
			user.save()
			response.sendStatus(204)
		} catch {
			response.status(500).send({ message: 'Could not delete user' })
		}

		next()
	},
	
	forgetUser: (request: Request, response: Response, next: NextFunction) => {
		try {
			const { cpf, secret } = request.params;
			const user = await User.findOneOrFail({ where: { cpf, secret: md5(secret) } });
			User.delete(user)
			response.status(204).send({ message: 'User has been forgotten and will not be available any longer.' })
		} catch {
			response.status(500).send({ message: 'Could not delete user' })
		}

		next()
	},
};

