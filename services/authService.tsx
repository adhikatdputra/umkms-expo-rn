import authApi from "@/api/auth";
import { useAuth } from "@/composables/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      Toast.success("Sign in successful");
      useAuth.saveToken(data?.data?.token);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    },
    onError: () => {
      Toast.error("Sign in failed");
    },
  });
};
