import {Router} from 'express';
import {TransferController} from './TransferController';

const TransferRouter = Router();

TransferRouter.put('/', TransferController.sendMoney);
TransferRouter.post('/revert', TransferController.revertTransfer);

export default TransferRouter;
