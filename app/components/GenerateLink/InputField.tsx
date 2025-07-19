import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "../../../src/constants/Colors";

interface InputFieldProps
  extends Omit<TextInputProps, "onChange" | "onFocus" | "onBlur" | "value"> {
  label: string;
  placeholder: string;
  icon: string;
  value: string | number;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  isFocused: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  value,
  keyboardType = "default",
  error,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const theme = useTheme() as AppTheme;
  const colors = theme.colors;

  return (
    <>
      {/* Label */}
      <View className="flex-row items-center mb-2 gap-2">
        <Ionicons name={icon as any} size={16} color={colors.primary} />
        <Text
          className="text-base font-semibold"
          style={{ color: colors.text }}
        >
          {label}
        </Text>
      </View>

      {/* Input */}
      <View
        className="flex-row items-center rounded-xl border-2 px-4 py-1"
        style={{
          borderColor: error
            ? colors.error
            : isFocused
              ? colors.primary
              : colors.borderSecondary,
          boxShadow: isFocused ? `0 0 10px ${colors.primary}` : "none",
        }}
      >
        <TextInput
          className="flex-1 text-base py-3 font-medium"
          style={{ color: colors.text }}
          value={value.toString()}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textExtra}
          keyboardType={keyboardType}
          accessibilityLabel={label}
          accessibilityHint={`Enter ${label.toLowerCase()}`}
          {...props}
        />
        {isFocused && (
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        )}
      </View>

      {/* Error */}
      {error && (
        <View className="flex-row items-center mt-2 gap-1.5">
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text className="text-sm font-medium" style={{ color: colors.error }}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
};

export default InputField;
