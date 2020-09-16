import { Router } from 'express';
import * as afterBankConsentController from './consent/afterbank-consent.controller';
import * as afterBankPISPController from './pisp/afterbank-pisp.controller';
import * as afterBankAISPController from './aisp/afterbank-aisp.controller';
import * as afterBankController from './afterbank.controller';

const router = Router();

router.get('/consent/get', afterBankConsentController.getConsent);

router.post('/consent/callback', afterBankConsentController.consentCallBack);

router.get('/consent/response', afterBankConsentController.getConsentCallBack);

router.post('/account/account-information', afterBankAISPController.fetchAccountInformation);

router.post('/payment/initiate/', afterBankPISPController.initiatePayment);

router.post('/payment/initiate/callback', afterBankPISPController.paymentInitiateCallBack);

router.get('/payment/initiate/response', afterBankPISPController.getPaymentInitiateCallBack);

router.get('/listOfSupportedBanks', afterBankController.getBanks);

export default router;
