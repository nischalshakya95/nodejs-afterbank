import { Router } from 'express';
import * as afterBankConsentController from './controller/afterbank-consent.controller';
import * as afterBankPISPController from './controller/afterbank-pisp.controller';
import * as afterBankAISPController from './controller/afterbank-aisp.controller';
import * as afterBankController from './controller/afterbank.controller';

const router = Router();

router.get('/consent/get', afterBankConsentController.getConsent);

router.post('/consent/callback', afterBankConsentController.consentCallBack);

router.get('/consent/response', afterBankConsentController.getConsentCallBack);

router.get('/account/account-information', afterBankAISPController.fetchAccountInformation);

router.post('/payment/initiate/', afterBankPISPController.initiatePayment);

router.post('/payment/initiate/callback', afterBankPISPController.paymentInitiateCallBack);

router.get('/payment/initiate/response', afterBankPISPController.getPaymentInitiateCallBack);

router.get('/payment/status', afterBankPISPController.getPaymentStatus);

router.get('/listOfSupportedBanks', afterBankController.getBanks);

export default router;
