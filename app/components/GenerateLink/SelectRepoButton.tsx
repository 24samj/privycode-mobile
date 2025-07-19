import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

interface Props {
  onPress: () => void;
  selectedRepo?: string;
  disabled?: boolean;
}

const SelectRepoButton: React.FC<Props> = ({
  onPress,
  selectedRepo,
  disabled,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 rounded-xl border shadow-sm"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-10 h-10 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: colors.accentPrimary }}
        >
          <Ionicons name="logo-github" size={20} color={colors.icon} />
        </View>
        <View className="flex-1">
          <Text
            className="text-base font-semibold"
            style={{ color: colors.text }}
          >
            {selectedRepo ? selectedRepo : "Select from GitHub"}
          </Text>
          <Text className="text-sm mt-1" style={{ color: colors.textExtra }}>
            {selectedRepo
              ? "Tap to change repository"
              : "Choose a repository from your GitHub account"}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textExtra} />
    </TouchableOpacity>
  );
};

export default SelectRepoButton;
