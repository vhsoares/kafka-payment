import {validate} from 'uuid';

import {Request, NextFunction, Response} from 'express';

export const isPayerIdValidUuid = (request: Request, response: Response, next: NextFunction) => {
	validate(request.body.id);
};
