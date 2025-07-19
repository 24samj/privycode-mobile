import React from "react";
import { Text, Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { remapProps } from "nativewind";
import { useTheme } from "../../../src/hooks";

interface HeaderProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

const RemappedLinearGradient = remapProps(LinearGradient, {
  className: "style",
});

const Header: React.FC<HeaderProps> = ({ fadeAnim, slideAnim }) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      className="items-center my-7"
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-30, 0],
            }),
          },
        ],
      }}
    >
      <View className="rounded-lg overflow-hidden w-20 h-20 mb-4">
        <RemappedLinearGradient
          colors={[colors.primary + "20", colors.primary + "10"]}
          className="flex-1 items-center justify-center"
        >
          <Ionicons name="code-sharp" size={32} color={colors.primary} />
        </RemappedLinearGradient>
      </View>
      <Text
        className="text-center text-2xl font-bold mb-2"
        style={{ color: colors.text }}
      >
        Generate New Link
      </Text>
      <Text
        className="text-center text-base px-5 leading-6"
        style={{ color: colors.textExtra }}
      >
        Create a secure, time-limited link to share your private repository
      </Text>
    </Animated.View>
  );
};

export default Header;
