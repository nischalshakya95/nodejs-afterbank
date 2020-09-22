import { Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import { AccountInformation } from '../model/account-information-response';
import { config } from '../../config/config';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  accept: ' application/json'
};

export async function fetchAccountInformation(req: Request, res: Response) {
  try {
    const request = qs.stringify({
      servicekey: config.afterBank.serviceKey,
      token: 'sandbox.r6s9c2fm',
      startDate: '08-08-2020',
      products: 'GLOBAL'
    });
    const { data } = await axios.post('https://apipsd2.afterbanks.com/transactions/', request, {
      headers
    });
    const accountInformations: AccountInformation[] = data;
    const { accountId } = req.query;

    if (!accountId) {
      return res.status(200).json({ data: accountInformations });
    } else {
      const accountInformation: AccountInformation = accountInformations.filter((f) => {
        return f.iban === accountId;
      })[0];
      res.status(200).json({ data: accountInformation });
    }
  } catch (err) {
    res.status(400).json({ data: err });
  }
}
