import axios from 'axios';
import { Request, Response } from 'express';
import { Banks } from './model/banks';

export async function getBanks(req: Request, res: Response) {
  try {
    const response = await axios.get('https://apipsd2.afterbanks.com/listOfSupportedBanks');
    const banks: Banks[] = response.data;
    res.status(200).send({ data: banks });
  } catch (err) {
    res.status(400).json({ data: err });
  }
}
