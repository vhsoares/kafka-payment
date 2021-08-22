import {getRepository} from 'typeorm';
import {User} from './../entity/UserEntity';
import {NextFunction, Request, Response} from 'express';

export const validateCpf = (request: Request, response: Response, next: NextFunction) => {
	const {cpf} = request.body;

	if (!basicCpfValidation(cpf)) {
		return response.status(403).send({message: 'Not valid cpf'});
	}

	next();
};

export const validateName = (request: Request, response: Response, next: NextFunction) => {
	const {name} = request.body;
	if (!name || name.lenght < 5) {
		return response.status(403).send({message: 'Not valid name'});
	}

	next();
};

export const validateSecret = (request: Request, response: Response, next: NextFunction) => {
	const {secret} = request.body;
	if (!secret || secret.lenght < 5) {
		return response.status(403).send({message: 'Not valid secret'});
	}

	next();
};

export const validateIfEmailAlreadyRegistered = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const {email} = request.body;

	const userRepository = getRepository(User);
	console.log(await userRepository.count({where: {email}}));
	const registeredUserCount = await userRepository.count({where: {email}});

	if (registeredUserCount > 0) {
		return response.status(409).send({message: 'Email already registered'});
	}

	next();
};

export const validateIfCpfAlreadyRegistered = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const {cpf} = request.body;

	const userRepository = getRepository(User);
	const registeredUserCount = await userRepository.findAndCount({where: {cpf}})[1];

	if (registeredUserCount > 0) {
		return response.status(409).send({message: 'Cpf already registered'});
	}

	next();
};

const basicCpfValidation = (cpf: string) => {
	if (cpf === '00000000000'
	|| cpf === '11111111111'
	|| cpf === '22222222222'
	|| cpf === '33333333333'
	|| cpf === '44444444444'
	|| cpf === '55555555555'
	|| cpf === '66666666666'
	|| cpf === '77777777777'
	|| cpf === '88888888888'
	|| cpf === '99999999999') {
		return false;
	}

	return true;
};

