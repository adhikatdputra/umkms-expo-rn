export interface Balance {
  id: string;
  createdTime: string;
  updatedTime: string;
  userId: string;
  currencyId: string;
  number: number;
  type: string;
  merchantId: string;
  balance: number;
  locked: number;
  pending: number;
  partnerId: string;
  userid: string;
  partnerid: string;
}

export interface CreateQris {
  requestId: string;
  type: "qris" | "transfer";
  amount: number;
  label: string;
  senderInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  recipientInfo: {
    name: string;
    address: string;
  };
}

export interface ParamsTrx {
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  search: string;
}

export interface Trx {
  id: string;
  createdTime?: string;
  accountId?: string;
  type?: string;
  status: string;
  amount: number;
  feeAmount: number;
  bankId?: string;
  bank?: string;
  channel?: string;
  address?: string | null;
  addressName?: string;
  networkReference?: string | null;
  depositId?: string;
  transactionId: string;
  requestId: string;
  merchantId?: string;
  merchantNetworkId?: string;
  feeCreditors?: FeeCreditors[];
  feeDebitors?: FeeDebitors[];
  additionalInfo?: AdditionalInfo | null;
  isSimulator?: boolean;
  paymentUrl?: string;
  paymentLink?: string;
  qrImage?: string;
  senderInfo: SenderInfo;
  recipientInfo: RecipientInfo;
  label?: string;
  notes?: string;
  feeType?: string;
  isPaid?: boolean;
  paymentVerifiedAt?: string | null;
  receivedAmount?: number;
  totalAmount?: number;
  settlementStatus?: string;
  settlement?: Settlement;
  webhookUrl?: string | null;
  statusMessage?: string;
  rrn?: string | null;
}

export interface FeeCreditors {
  name: string;
  amount: number;
}

export interface FeeDebitors {
  name: string;
  amount: number;
}

export interface AdditionalInfo {
  paymentId: string;
}

export interface SenderInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface RecipientInfo {
  name: string;
  address: string;
}

export interface Settlement {
  id: string;
  amount: number;
  type: string;
  releaseamount: number;
  releasestatus: string;
  totaltransaction: number;
  releasetime: string;
}
