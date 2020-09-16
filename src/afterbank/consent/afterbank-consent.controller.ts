import { Consent } from '../model/consent';
import logger from '../../config/logger';
import { config } from '../../config/config';
import { Consentcallback } from '../model/consentcallback';
import qs from 'qs';
import axios from 'axios';
import { Request, Response } from 'express';

const CONSENT_DATA = qs.stringify({
  servicekey: config.afterBank.serviceKey,
  service: config.afterBank.service,
  grantType: config.afterBank.grantType,
  validUntil: config.afterBank.validUntil,
  yourConsentCallback: config.afterBank.consentCallBackUrl,
  urlRedirect: config.afterBank.consentCallBackResponseUrl
});

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

let consentcallback: Consentcallback = {};

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
  const urlRedirect: string = config.afterBank.consentCallBackResponseUrl
    ? config.afterBank.consentCallBackResponseUrl
    : 'https://localhost:8080/consent/response';
  res.redirect(urlRedirect);
}

export async function getConsentCallBack(req: Request, res: Response) {
  res.status(200).send({ data: consentcallback });
}
