import { Router } from 'express';
import { registerRouterList } from '../core/helper/routerHelper.js';
import uploadRouter from './uploadRouter.js';
import paymentRouter from './paymentRouter.js';

const router = Router();
// overwrite thì khai báo trước registerRouterList(router);
router.use('/', uploadRouter);
router.use('/', paymentRouter);

registerRouterList(router);

export default router;
// export { registerRouterList };
