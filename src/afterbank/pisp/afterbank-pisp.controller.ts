import { Request, Response } from 'express';

let paymentCallback = {};

export async function paymentInitiateCallBack(req: Request, res: Response) {
  paymentCallback = req.body;
}

export async function getPaymentInitiateCallBack(req: Request, res: Response) {
  res.status(200).send({ data: paymentCallback });
}
