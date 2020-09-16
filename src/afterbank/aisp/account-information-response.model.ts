export interface AccountInformation {
  product: string;
  type: string;
  balance: number;
  currency: number;
  iban: string;

  ownerName?: string;
  countable_balance?: number;
  arranged_balance?: number;
  balance_credit_granted?: number;
}
