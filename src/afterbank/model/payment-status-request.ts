import { BaseRequest } from './base-request';

export interface PaymentStatusRequest extends BaseRequest {
  paymentId: string;
}
