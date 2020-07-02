import { Router } from 'express';
import * as afterBankController from './afterbank.controller';

const router = Router();

router.get('/consent/get', afterBankController.getConsent);

export default router;