import axios from "@/lib/axios";

const authApi = {
  login: async () => {
    return axios.post(`/api/user/access-token/b2b`, {
      clientId: "ed5f43b2-1bfb-4ed5-b5ec-799e1e2cd805",
      clientSecret: "zbUoCNYUi+0b0t6C5Le2tFBIR91mCCIPZ4nmJFeVQRk=",
    });
  },
  getUser: async () => {
    return axios.get(`/api/user/me`);
  },
};

export default authApi;
