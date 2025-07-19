import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/hooks";

const features = [
  { icon: "shield-checkmark", text: "Secure access control" },
  { icon: "time", text: "Expiring viewer links" },
  { icon: "eye", text: "Read-only repository access" },
];

const FeaturesList = () => {
  const { colors } = useTheme();
  return (
    <View className="items-center space-y-4">
      {features.map((f) => (
        <View key={f.text} className="flex-row items-center space-x-3">
          <View
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.accentSecondary }}
          >
            <Ionicons name={f.icon as any} size={16} color={colors.primary} />
          </View>
          <Text style={{ color: colors.textExtra }} className="text-sm">
            {f.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default FeaturesList;
