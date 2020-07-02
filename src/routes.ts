import { Router } from 'express';
import afterBankRoutes from './afterbank/aferbank.routes';

const router = Router();
router.use(afterBankRoutes);

export default router;