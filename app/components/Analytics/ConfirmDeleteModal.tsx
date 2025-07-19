import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PopupModal from "../PopupModal";
import { useTheme } from "@/hooks";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useTheme();

  return (
    <PopupModal
      visible={visible}
      onTapOutside={onCancel}
      containerClassName="w-72"
    >
      <View className="items-center mb-4">
        <Ionicons name="trash" size={32} color={colors.error} />
      </View>
      <Text
        className="text-center text-lg font-semibold mb-2"
        style={{ color: colors.text }}
      >
        Delete Link?
      </Text>
      <Text className="text-center mb-6" style={{ color: colors.textExtra }}>
        This action cannot be undone.
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="flex-1 py-2 mr-2 rounded-xl items-center"
          style={{ backgroundColor: colors.accentSecondary }}
          onPress={onCancel}
        >
          <Text style={{ color: colors.text }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-2 ml-2 rounded-xl items-center"
          style={{ backgroundColor: colors.error }}
          onPress={onConfirm}
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </PopupModal>
  );
};

export default ConfirmDeleteModal;
