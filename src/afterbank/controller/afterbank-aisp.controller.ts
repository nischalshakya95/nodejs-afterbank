import { Request, Response } from 'express';
import { AccountInformationRequest } from '../model/account-information-request';
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
    const accountInformationRequest: AccountInformationRequest = req.body;
    // @ts-ignore
    accountInformationRequest.servicekey = config.afterBank.serviceKey;
    const request = qs.stringify(accountInformationRequest);
    const { data } = await axios.post('https://apipsd2.afterbanks.com/transactions/', request, {
      headers
    });
    const accountInformation: AccountInformation[] = data;
    res.status(200).json({ data: accountInformation });
  } catch (err) {
    res.status(400).json({ data: err });
  }
}
