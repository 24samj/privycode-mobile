import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CustomColors } from "../../../src/constants/Colors";

interface SubmitButtonProps {
  onPress: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
  colors: CustomColors;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  isLoading,
  isDisabled = false,
  colors,
}) => {
  const disabled = isLoading || isDisabled;

  return (
    <TouchableOpacity
      className="rounded-2xl shadow-lg shadow-black/20"
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel="Generate Link"
      accessibilityHint="Tap to create a shareable link for your repository"
    >
      <LinearGradient
        colors={[colors.primary, colors.primary]}
        className="flex-row items-center justify-center p-4 rounded-2xl gap-2 overflow-hidden"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.textNegative} />
        ) : (
          <>
            <Ionicons name="link" size={20} color="white" />
            <Text className="text-lg font-bold text-white">Generate Link</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SubmitButton;
