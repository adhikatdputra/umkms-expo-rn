import axios from "@/lib/axios";

const authApi = {
  login: async () => {
    return axios.post(`/api/user/access-token/b2b`, {
      clientId: "dcbe7aa2-9fe2-4f68-a8bd-1e7a7b381306",
      clientSecret: "kF18b+I40Tshyb2WaWk8wADcRgz21AWiwKfZzBkmzUk=",
    });
  },
  getUser: async () => {
    return axios.get(`/api/user/me`);
  },
};

export default authApi;
