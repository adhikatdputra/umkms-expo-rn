import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/number";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");

  const handleAmountChange = (text: string) => {
    const formattedValue = formatCurrency(text);
    setAmount(formattedValue);
  };

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
        <Button title="Buat QRIS" onPress={() => {}} variant="primary" />
      </View>
    </SafeAreaView>
  );
}
