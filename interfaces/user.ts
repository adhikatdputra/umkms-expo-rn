export interface User {
  id: string;
  createdTime: string;
  updatedTime: string;
  status: string;
  email: string;
  mobile: string;
  name: string;
  verifiedTime: string;
  partnerId: string;
  roles: string[];
  configs: Record<string, any>;
  twoFAEnabled: boolean;
  merchantId: string;
  isBackOffice: boolean;
  store: string;
  partner: Partner;
}

export interface Partner {
  id: string;
  name: string;
  code: string;
  callbackUrl: string;
  settlementMethod: string;
}
