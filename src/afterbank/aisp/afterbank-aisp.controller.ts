import { Request, Response } from 'express';
import { AccountInformationRequest } from './account-information-request.model';
import axios from 'axios';
import { AccountInformation } from './account-information-response.model';
import qs from 'qs';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json'
};

export async function fetchAccountInformation(req: Request, res: Response) {
  try {
    const accountInformationRequest: AccountInformationRequest = req.body;
    const request = qs.stringify(accountInformationRequest);
    const response: AccountInformation = await axios.post('https://apipsd2.afterbanks.com/transactions', request, {
      headers
    });
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(400).json({ data: err });
  }
}
