import {Router} from 'express';

import {UserController} from './UserController';
import {validateCpf,
	validateIfEmailAlreadyRegistered,
	validateIfCpfAlreadyRegistered,
	validateName,
	validateSecret,
} from './UserMiddlewares';

const UserRouter = Router();

UserRouter.get('/:cpf/:secret', UserController.getUser);
UserRouter.get('/:userId/ballance', UserController.getUserBallance);
UserRouter.get('/:userId/history', UserController.getUserTransactions);

UserRouter.put('/',
	validateCpf,
	validateName,
	validateSecret,
	validateIfCpfAlreadyRegistered,
	validateIfEmailAlreadyRegistered,
	UserController.createUser);

UserRouter.delete('/',
	validateCpf,
	validateSecret,
	UserController.deleteUser);

UserRouter.post('/:userId/forget',
	validateCpf,
	validateSecret,
	UserController.forgetUser);

export default UserRouter;
