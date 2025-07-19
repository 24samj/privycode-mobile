import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/hooks";

const LogoSection = () => {
  const { colors } = useTheme();
  return (
    <View className="items-center mb-16">
      <View
        className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
        style={{
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOpacity: 0.3,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        }}
      >
        <Ionicons name="code-slash" size={32} color={colors.iconNegative} />
      </View>
      <Text className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
        PrivyCode
      </Text>
      <Text
        className="text-lg text-center leading-7"
        style={{ color: colors.textExtra }}
      >
        Share your private repositories{"\n"}with secure, expiring links
      </Text>
    </View>
  );
};

export default LogoSection;
