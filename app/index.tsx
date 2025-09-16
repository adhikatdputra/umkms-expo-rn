import { Button, Image, Text, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Toast } from "toastify-react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="h-[178px] w-[290px] bottom-0 left-0 absolute"
        />
      }
    >
      <ThemedView className="gap-2 mb-2">
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-2xl font-bold text-red-500">
            Welcome to Nativewind!
          </Text>
          <HelloWave />
        </View>
      </ThemedView>
      <ThemedView className="gap-2 mb-2">
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <Button
          title="Show Toast"
          onPress={() => Toast.success("Success message!")}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}
