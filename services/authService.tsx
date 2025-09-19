import authApi from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";

export const useLogin = () => {
  const { login } = useAuthContext();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      try {
        Toast.success("Sign in successful");
        await login(data?.data?.token);
      } catch (error) {
        console.error("Error during login:", error);
        Toast.error("Sign in failed");
      }
    },
    onError: () => {
      Toast.error("Sign in failed");
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthContext();
  
  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      Toast.success("Logout successful");
    },
    onError: () => {
      Toast.error("Logout failed");
    },
  });
};
