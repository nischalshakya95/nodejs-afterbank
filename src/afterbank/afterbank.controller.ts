import qs from 'qs';
import axios from 'axios';
import { Request, Response } from 'express';

import { Consent } from './model/consent';
import { Consentcallback } from './model/consentcallback';

import { config } from '../config/config';
import logger from '../config/logger';

const CONSENT_DATA = qs.stringify({
  servicekey: config.afterBank.serviceKey,
  service: config.afterBank.service,
  grantType: config.afterBank.grantType,
  validUntil: config.afterBank.validUntil,
  yourConsentCallback: config.afterBank.consentCallBackUrl,
  urlRedirect: 'https://nodejs-afterbank.herokuapp.com/consent/response'
});

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

let consentcallback: Consentcallback = {};
let paymentCallback = {};

export async function getConsent(req: Request, res: Response) {
  try {
    const response: Consent = await axios.post('https://apipsd2.afterbanks.com/consent/get/', CONSENT_DATA, { headers });
    logger.info(`getConsent response ${response}`);
    res.status(200).json({ data: response.data });
  } catch (err) {
    res.status(400).json({ data: err });
  }
}

export async function consentCallBack(req: Request, res: Response) {
  consentcallback = req.body;
  logger.info(`consentCallbackResponse ${consentCallBack}`);
  res.redirect('https://nodejs-afterbank.herokuapp.com/consent/response');
}

export async function getConsentCallBack(req: Request, res: Response) {
  res.status(200).send({ data: consentcallback });
}

export async function paymentInitiateCallBack(req: Request, res: Response) {
  paymentCallback = req.body;
}

export async function getPaymentInitiateCallBack(req: Request, res: Response) {
  res.status(200).send({ data: paymentCallback });
}
