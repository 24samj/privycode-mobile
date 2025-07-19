import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

interface InfoCardProps {
  icon: string;
  text: string;
  iconColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, text, iconColor }) => {
  const { colors } = useTheme();

  return (
    <View
      className="flex-row items-center p-4 rounded-xl gap-3"
      style={{ backgroundColor: colors.accentPrimary }}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={iconColor ?? colors.primary}
      />
      <Text
        className="flex-1 text-sm leading-5"
        style={{ color: colors.textExtra }}
      >
        {text}
      </Text>
    </View>
  );
};

export default InfoCard;
