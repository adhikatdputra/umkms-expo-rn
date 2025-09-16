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
  type: "qris";
  amount: 10000;
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
