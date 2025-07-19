import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/hooks";

interface Props {
  onPress: () => void;
}

const GithubButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      className="w-full mb-6"
      activeOpacity={0.9}
      onPress={onPress}
    >
      <LinearGradient
        colors={[colors.primary, colors.primary + "90", colors.primary + "70"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center justify-center py-4 px-8 rounded-2xl overflow-hidden"
      >
        <Ionicons name="logo-github" size={24} color={colors.iconNegative} />
        <Text
          className="text-lg font-semibold ml-3"
          style={{ color: colors.textNegative }}
        >
          Continue with GitHub
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GithubButton;
