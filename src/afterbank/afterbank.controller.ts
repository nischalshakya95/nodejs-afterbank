import { Request, Response } from 'express';
import { Consent } from './model/consent';
import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

const CONSENT_DATA = qs.stringify({
  servicekey: config.afterBank.serviceKey,
  service: config.afterBank.service,
  grantType: config.afterBank.grantType,
  validUntil: config.afterBank.validUntil,
  yourConsentCallback: config.afterBank.consentCallBackUrl
});

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

export async function getConsent(req: Request, res: Response) {
  try {
    const response: Consent = await axios.post('https://apipsd2.afterbanks.com/consent/get/', CONSENT_DATA, { headers });
    res.status(200).json({ data: response.data });
  } catch (err) {
    res.status(400).json({ data: err });
  }
}
