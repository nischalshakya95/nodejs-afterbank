import { BaseRequest } from './base-request';

export interface PaymentInitiateRequest extends BaseRequest {
  paymentType: string;
  currency: string;
  amount: number;
  sourceIBAN: string;
  destinationIBAN: string;
  destinationCreditorName: string;
  paymentDescription: string;
  yourPaymentCallback: string;
  urlRedirect?: string;
}
