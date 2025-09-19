import { CreateQris, ParamsTrx } from "@/interfaces/transactions";
import axios from "@/lib/axios";

const transactionsApi = {
  getBalance: async () => {
    return axios.get(`/api/accounts/payment`);
  },
  getTrx: async (params: ParamsTrx) => {
    return axios.get(`/api/payments`, { params });
  },
  createQris: async (data: CreateQris) => {
    return axios.post(`/api/payments`, data);
  },
  detailTrx: async (accountId: string, trxId: string) => {
    return axios.get(`/api/payments/${accountId}/detail/${trxId}`);
  },
};

export default transactionsApi;
