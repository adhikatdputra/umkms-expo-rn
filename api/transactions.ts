import axios from "@/lib/axios";

const transactionsApi = {
  getBalance: async () => {
    return axios.get(`/api/accounts/payment`);
  },
};

export default transactionsApi;
