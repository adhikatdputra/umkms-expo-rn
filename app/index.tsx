import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLogin } from "@/services/authService";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const emailValue = "user@umkms.com";
const passwordValue = "qwerty12";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const { mutate: loginMutation, isPending } = useLogin();
  const { isAuthenticated, isLoading } = useAuthContext();

  // * Redirect to home if user is already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, isLoading]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setSeePassword(false);
  };

  const handleSignIn = () => {
    // if (email === "" || password === "") {
    //   Toast.error("Please fill in all fields");
    //   return;
    // }
    // if (email !== emailValue || password !== passwordValue) {
    //   Toast.error("Invalid email or password");
    //   return;
    // }
    loginMutation(undefined, {
      onSuccess: () => {
        setTimeout(() => {
          resetForm();
          // * Navigate to home after successful login
          router.replace("/(tabs)/home");
        }, 2000);
      },
    });
  };

  // * Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-6 w-full bg-white justify-center items-center">
      <View className="flex-1 w-full">
        <View className="flex-1 items-center justify-center gap-3">
          <LottieView
            source={require("@/assets/animations/hallo.json")}
            style={{ width: 300, height: 200 }}
            autoPlay
            loop
          />
          <Text className="text-4xl font-bold text-black">
            Let&apos;s Sign you in.
          </Text>
          <Text className="text-2xl text-black">Welcome back.</Text>
          <Text className="text-2xl text-black">You&apos;ve been missed.</Text>
          <View className="gap-6 w-full mt-6 px-4">
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="border border-gray-300 rounded-xl p-4"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View className="relative">
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 rounded-xl p-4"
                secureTextEntry={!seePassword}
                autoCapitalize="none"
                autoCorrect={false}
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
                isLoading={isPending}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
