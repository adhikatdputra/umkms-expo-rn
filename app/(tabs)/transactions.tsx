import transactionsApi from "@/api/transactions";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { formatCurrency } from "@/helpers/number";
import { CreateQris } from "@/interfaces/transactions";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";


export default function TabTwoScreen() {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const [amount, setAmount] = useState("");
  const [rawDataAmount, setRawDataAmount] = useState(0);
  const [label, setLabel] = useState("");
  const [requestId, setRequestId] = useState("");

  const createQrisMutation = useMutation({
    mutationFn: (data: CreateQris) => transactionsApi.createQris(data),
    onSuccess: (data) => {
      console.log(data.data);
      Toast.show({
        type: "success",
        text1: "QRIS berhasil dibuat",
      });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
  });

  // * Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading]);

  const createRandomUUID = () => {
    const randomString = () => Math.random().toString(36).substring(2, 6);
    setRequestId(
      `${randomString()}-${randomString()}-${randomString()}-${randomString()}`
    );
  };

  const handleAmountChange = (text: string) => {
    const formattedValue = formatCurrency(text);
    setAmount(formattedValue);

    // * Get raw data amount
    const numericValue = text.replace(/[^0-9]/g, "");
    const rawNum = parseInt(numericValue) || 0;
    setRawDataAmount(rawNum);
  };

  const handleCreateQris = () => {
    if (rawDataAmount === 0) {
      Toast.show({
        type: "error",
        text1: "Harap masukkan nominal",
      });
      return;
    }
    if (label === "") {
      Toast.show({
        type: "error",
        text1: "Harap masukkan deskripsi",
      });
      return;
    }
    createRandomUUID();
    const data = {
      requestId,
      type: "qris" as const,
      amount: rawDataAmount,
      label,
      senderInfo: {
        name: "max cavalera",
        email: "max.cavalera@umkms.com",
        phone: "08129439291",
        address: "Kota Administrasi Jakarta Selatan",
      },
      recipientInfo: {
        name: "NFFA PT Test",
        address: "Jalan yos sudarso nomor 55",
      },
    };
    // console.log(data);
    createQrisMutation.mutate(data);
  };

  // * Show loading spinner while checking authentication status
  if (authLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-6 w-full bg-white gap-4">
      <Text className="text-2xl font-bold">Transactions</Text>
      <View className="rounded-xl bg-primary">
        <View className="p-4">
          <Text className="text-white">Masukkan Nominal</Text>
        </View>
        <View className="rounded-xl p-4 bg-white border border-gray-400 flex-row items-center gap-2 w-full">
          <Text className="text-black text-2xl">Rp. </Text>
          <TextInput
            placeholder="0"
            className="text-3xl flex-1 font-semibold"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View className="gap-4 mt-4">
        <View className="gap-3">
          <Text className="">Deskripsi (Opsional)</Text>
          <TextInput
            placeholder="Masukkan deskripsi"
            className="border border-gray-400 rounded-xl p-4"
            value={label}
            onChangeText={setLabel}
          />
        </View>
      </View>
      <View className="mt-4 flex items-center justify-center">
        <Button
          title="Buat QRIS"
          onPress={handleCreateQris}
          variant="primary"
          disabled={createQrisMutation.isPending}
          isLoading={createQrisMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
