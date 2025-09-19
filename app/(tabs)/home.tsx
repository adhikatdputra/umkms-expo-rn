import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// import { Toast } from "toastify-react-native";
import transactionsApi from "@/api/transactions";
import { useAuthContext } from "@/contexts/AuthContext";
import { formatDate } from "@/helpers/date";
import { formatRupiah } from "@/helpers/number";
import { Balance } from "@/interfaces/transactions";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { data: balance, isLoading } = useQuery({
    queryKey: ["balance"],
    queryFn: transactionsApi.getBalance,
    select: (data) => data.data as Balance,
    enabled: isAuthenticated,
  });

  // * Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading]);

  // * Show loading spinner while checking authentication status
  if (authLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-6 w-full bg-gray-100 gap-4">
      <Text>
        HALO,{" "}
        <Text className="font-bold uppercase">ADHIKA TRISNA DWIPUTRA</Text>
      </Text>
      <View className="flex w-full">
        <View className="h-[150px] bg-primary/90 rounded-xl relative overflow-hidden p-6">
          <View className="z-10">
            <Text className="text-white text-xl font-bold">Saldo Anda:</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white text-3xl font-bold">
                {formatRupiah(balance?.balance || 0)}
              </Text>
            )}
          </View>
          <View className="absolute w-[250px] h-[250px] -right-20 -top-4 bg-primary rounded-full"></View>
          <View className="absolute w-[200px] h-[200px] -right-20 -bottom-4 bg-red-300 rounded-full"></View>
        </View>
      </View>
      <View className="mt-2">
        <Text className="text-lg font-bold">Riwayat Transaksi</Text>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className=" gap-2">
          <View className="gap-4 mt-2">
            <View className="w-full bg-white rounded-xl p-8 flex-row items-center justify-center gap-2">
              <ActivityIndicator size="small" color="black" />
              <Text>Mohon menunggu...</Text>
            </View>
          </View>
          <View className="gap-4 mt-2">
            <View className="w-full bg-white rounded-xl p-4 flex-row justify-between">
              <View className="gap-2">
                <Text>ID #353636</Text>
                <Text className="text-sm text-gray-500">
                  {formatDate("2025-09-17 10:00:00")}
                </Text>
              </View>
              <View className="gap-0 items-end">
                <Text className="text-lg font-bold">
                  {formatRupiah(100000)}
                </Text>
                <Text className="text-sm font-semibold text-primary">
                  Berhasil
                </Text>
              </View>
            </View>
            <View className="w-full bg-white rounded-xl p-4 flex-row justify-between">
              <View className="gap-2">
                <Text>ID #353636</Text>
                <Text className="text-sm text-gray-500">
                  {formatDate("2025-09-17 10:00:00")}
                </Text>
              </View>
              <View className="gap-0 items-end">
                <Text className="text-lg font-bold">
                  {formatRupiah(100000)}
                </Text>
                <Text className="text-sm font-semibold text-yellow-500">
                  Pending
                </Text>
              </View>
            </View>
            <View className="w-full bg-white rounded-xl p-4 flex-row justify-between">
              <View className="gap-2">
                <Text>ID #353636</Text>
                <Text className="text-sm text-gray-500">
                  {formatDate("2025-09-17 10:00:00")}
                </Text>
              </View>
              <View className="gap-0 items-end">
                <Text className="text-lg font-bold">
                  {formatRupiah(100000)}
                </Text>
                <Text className="text-sm font-semibold text-red-400">
                  Gagal
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-4 items-center justify-center">
            <LottieView
              source={require("@/assets/animations/empty.json")}
              style={{ width: 300, height: 200 }}
              autoPlay
              loop
            />
            <Text className="text-sm text-gray-500">Tidak ada data</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
