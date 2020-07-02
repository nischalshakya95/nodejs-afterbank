import { Router } from 'express';
import * as afterBankController from './afterbank.controller';

const router = Router();

router.get('/consent/get', afterBankController.getConsent);

router.post('/consent/callback', afterBankController.consentCallBack);

router.get('/consent/response', afterBankController.getConsentCallBack);

router.post('/payment/initiate/callback', afterBankController.paymentInitiateCallBack);

router.get('/payment/initiate/response', afterBankController.getPaymentInitiateCallBack);

export default router;
