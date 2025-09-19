import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import authApi from "@/api/auth";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/interfaces/user";
import { useLogout } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabTwoScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();
  
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    select: (data) => data.data as User,
    enabled: isAuthenticated
  });

  // * Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading]);

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  // * Show loading spinner while checking authentication status
  if (authLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#4EAB33", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#fff"
          name="person"
          style={styles.headerImage}
        />
      }
    >
      <View className="gap-2">
        <Text className="text-4xl font-bold">{user?.name}</Text>
        <Text className="font-medium mb-1 text-gray-500">
          ID: #{user?.merchantId}
        </Text>
        <View className="gap-4 mt-4">
          <View className="flex-row items-center gap-2 border-b border-gray-300 pb-4">
            <IconSymbol size={22} color="#808080" name="storefront" />
            <Text className="capitalize">{user?.store}</Text>
          </View>
          <View className="flex-row items-center gap-2 border-b border-gray-300 pb-4">
            <IconSymbol size={22} color="#808080" name="envelope" />
            <Text>{user?.email}</Text>
          </View>
          <View className="flex-row items-center gap-2 border-b border-gray-300 pb-4">
            <IconSymbol size={22} color="#808080" name="phone" />
            <Text>{user?.mobile}</Text>
          </View>
        </View>
        <View className="mt-6">
          <Button 
            title={isLoggingOut ? "Logging out..." : "Logout"} 
            onPress={handleLogout} 
            variant="outline"
            isLoading={isLoggingOut}
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
