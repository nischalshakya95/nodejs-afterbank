import { Request, Response } from 'express';
import { PaymentInitiateRequest } from '../model/payment-initiate-request';
import { config } from '../../config/config';
import qs from 'qs';
import axios from 'axios';
import { AccountInformation } from '../model/account-information-response';
import { AccountInformationRequest } from '../model/account-information-request';

let paymentCallback = {};

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  accept: ' application/json'
};

export async function initiatePayment(req: Request, res: Response) {
  try {
    const paymentInitiateRequest: PaymentInitiateRequest = req.body;
    // @ts-ignore
    paymentInitiateRequest.servicekey = config.afterBank.serviceKey;
    const request = qs.stringify(paymentInitiateRequest);

    const accountInformation: AccountInformation = await fetchAccount(paymentInitiateRequest.token, paymentInitiateRequest.sourceIBAN);

    if (accountInformation.balance >= paymentInitiateRequest.amount) {
      const { data } = await axios.post('https://apipsd2.afterbanks.com/payment/initiate/', request, { headers });
      res.status(200).json({ data });
    } else {
      res.status(400).send({ message: 'Insufficient Balance' });
    }
  } catch (err) {
    res.status(400).send({ data: err });
  }
}

export async function paymentInitiateCallBack(req: Request, res: Response) {
  paymentCallback = req.body;
}

export async function getPaymentInitiateCallBack(req: Request, res: Response) {
  res.status(200).send({ data: paymentCallback });
}

async function fetchAccount(token: string, iban: string) {
  // @ts-ignore
  const accountInformationRequest: AccountInformationRequest = {
    products: 'GLOBAL',
    startDate: '20-08-2020',
    token
  };
  // @ts-ignore
  accountInformationRequest.servicekey = config.afterBank.serviceKey;
  const request = qs.stringify(accountInformationRequest);
  const { data } = await axios.post('https://apipsd2.afterbanks.com/transactions/', request, {
    headers
  });
  const accountInformation: AccountInformation[] = data;
  return accountInformation.filter((f) => {
    return f.iban === iban;
  })[0];
}
