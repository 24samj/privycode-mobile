import React from "react";
import { Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AppTheme } from "../../src/constants";
import { useTabBarTranslate } from "../contexts/TabBarVisibilityContext";

const ICONS: Record<string, React.ComponentProps<typeof Ionicons>["name"]> = {
  GenerateLink: "link",
  Analytics: "analytics",
  Settings: "settings",
};

const LABELS: Record<string, string> = {
  GenerateLink: "Generate",
  Analytics: "Analytics",
  Settings: "Settings",
};

const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme() as AppTheme;
  const translateYValue = useTabBarTranslate();

  const containerBottom = insets.bottom + 16;

  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0 mx-4 flex-row overflow-hidden rounded-2xl bg-transparent py-2 shadow"
      style={{
        shadowColor: colors.text,
        transform: [{ translateY: translateYValue }],
        marginBottom: containerBottom,
      }}
    >
      {/* Gradient background */}
      <LinearGradient
        colors={[colors.card, colors.accentPrimary]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        // Animated progress: 1 = focused, 0 = unfocused
        const animationsRef = React.useRef<Record<string, Animated.Value>>(
          {},
        ).current;
        if (!animationsRef[route.key]) {
          animationsRef[route.key] = new Animated.Value(isFocused ? 1 : 0);
        }
        React.useEffect(() => {
          Animated.timing(animationsRef[route.key], {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }, [isFocused]);

        const progress = animationsRef[route.key];

        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0], // down when unfocused, up when focused
        });

        const scale = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1.2, 1],
        });

        const labelOpacity = progress;

        const onPress = () => {
          // Reset tab bar position to top
          translateYValue.setValue(0);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = ICONS[route.name] ?? "ellipse";
        const label = LABELS[route.name] ?? route.name;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={
              descriptors[route.key].options.tabBarAccessibilityLabel
            }
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center"
          >
            <Animated.View
              style={{
                transform: [{ translateY }, { scale }],
              }}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? colors.primary : colors.iconExtra}
              />
            </Animated.View>
            <Animated.Text
              numberOfLines={1}
              className="mt-0.5 text-[11px] font-semibold"
              style={{ color: colors.primary, opacity: labelOpacity }}
            >
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default FloatingTabBar;
