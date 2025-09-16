import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  onPress,
  className = "",
  variant = "primary",
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const baseClasses = "rounded-xl p-4 min-w-40";
  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-black",
    outline: "border border-gray-500",
    disabled: "bg-gray-300",
  };

  const textClasses = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-black",
    disabled: "text-gray-500",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? "opacity-80" : ""}`}
      disabled={disabled || isLoading}
    >
      {!isLoading && (
        <Text className={`text-center font-semibold ${textClasses[variant]} ${disabled ? "opacity-80" : ""}`}>
          {title}
        </Text>
      )}
      {isLoading && (
        <View className="flex-row items-center justify-center gap-3">
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? "white" : "black"}
            className={disabled ? "opacity-80" : ""}
          />
          <Text className={`text-center ${textClasses[variant]} ${disabled ? "opacity-80" : ""}`}>
            Please wait
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
