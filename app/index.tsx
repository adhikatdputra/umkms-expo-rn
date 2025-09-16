import { HelloWave } from "@/components/hello-wave";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const emailValue = "user@umkms.com"
const passwordValue = "qwerty12"

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const handleSignIn = () => {
    if (email === "" || password === "") {
      Toast.error("Please fill in all fields");
      return;
    }
    if (email !== emailValue || password !== passwordValue) {
      Toast.error("Invalid email or password");
      return;
    }
    Toast.success("Sign in successful");
  };

  return (
    <SafeAreaView className="flex-1 p-6 w-full bg-white justify-center items-center">
      <View className="flex-1 w-full">
        <View className="flex-1 items-center justify-center gap-3">
          <HelloWave />
          <Text className="text-4xl font-bold text-black">
            Let&apos;s Sign you in.
          </Text>
          <Text className="text-2xl text-black">Welcome back.</Text>
          <Text className="text-2xl text-black">You&apos;ve been missed.</Text>
          <View className="gap-6 w-full mt-6">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="border border-gray-300 rounded-xl p-4"
            />
            <View className="relative">
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 rounded-xl p-4"
                secureTextEntry={!seePassword}
              />
              <TouchableOpacity
                onPress={() => setSeePassword(!seePassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Text>{seePassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
            <View className="flex items-center justify-center">
              <Button
                title="Sign in"
                onPress={handleSignIn}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
