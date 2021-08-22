import {Request, Response, NextFunction} from 'express';

export const handleErrors = (error: Error, request: Request, response: Response, next: NextFunction) => {
	if (request.xhr) {
		response.status(500).send({error: 'Something failed!'});
	} else {
		next(error);
	}
};
