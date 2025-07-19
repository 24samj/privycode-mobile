import React from "react";
import { View, Text } from "react-native";
import { CustomColors } from "../../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  totalLinks: number;
  totalViews: number;
  colors: CustomColors;
}

const SummaryCard: React.FC<Props> = ({ totalLinks, totalViews, colors }) => {
  return (
    <View className="mb-4 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
      <View className="p-5">
        <Text className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          Summary
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="items-start">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalLinks}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Links
            </Text>
          </View>

          <View className="h-12 w-px bg-gray-200 dark:bg-gray-700" />

          <View className="items-end">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalViews}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Views
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SummaryCard;
