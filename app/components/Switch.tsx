/* Copyright (c) 2025 Sumit Chakraborty - Not for redistribution */
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  value: SharedValue<boolean>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  trackColors?: { on: string; off: string };
  thumbColors?: { on: string; off: string };
  direction?: "horizontal" | "vertical";
  size?: { width: number; height: number };
  showText?: boolean;
  textLabels?: { on: string; off: string };
};

const Switch = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: "#505256", off: "#34383b" },
  thumbColors = { on: "#FFFFFF", off: "#3f4346" },
  direction = "horizontal",
  size,
  showText = true,
  textLabels = { on: "ON", off: "OFF" },
}: Props) => {
  const isHorizontal = direction === "horizontal";

  // Default sizes based on direction
  const defaultSize = isHorizontal
    ? { width: 70, height: 40 }
    : { width: 40, height: 70 };

  const switchSize = size || defaultSize;
  const trackPadding = 3;
  const thumbSize =
    (isHorizontal ? switchSize.height : switchSize.width) - trackPadding * 2;

  // Calculate the movement distance for the thumb
  const maxTranslation = isHorizontal
    ? switchSize.width - thumbSize - trackPadding * 2
    : switchSize.height - thumbSize - trackPadding * 2;

  // Create derived values to avoid reading shared value during render
  const progress = useDerivedValue(() => {
    return value.value ? 1 : 0;
  });

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );

    return {
      backgroundColor: withTiming(color, { duration }),
      borderRadius: (isHorizontal ? switchSize.height : switchSize.width) / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateValue = interpolate(
      progress.value,
      [0, 1],
      [0, maxTranslation]
    );

    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [thumbColors.off, thumbColors.on]
    );

    return {
      transform: isHorizontal
        ? [{ translateX: withTiming(translateValue, { duration }) }]
        : [{ translateY: withTiming(translateValue, { duration }) }],
      backgroundColor: withTiming(bgColor, { duration }),
      borderRadius: thumbSize / 2,
      width: thumbSize,
      height: thumbSize,
    };
  });

  // Animated text styles
  const onTextStyle = useAnimatedStyle(() => {
    const opacity = withTiming(progress.value, { duration });
    return {
      opacity,
      position: "absolute" as const,
    };
  });

  const offTextStyle = useAnimatedStyle(() => {
    const opacity = withTiming(1 - progress.value, { duration });
    return {
      opacity,
      position: "absolute" as const,
    };
  });

  const thumbTextAnimatedStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      ["white", "black"]
    );
    return {
      color: textColor,
    };
  });

  return (
    <Pressable onPress={onPress} style={style} className="p-1">
      <Animated.View
        className="justify-start items-start bg-[#34383b]"
        style={[
          {
            width: switchSize.width,
            height: switchSize.height,
            padding: trackPadding,
          },
          trackAnimatedStyle,
        ]}
      >
        <Animated.View
          className="justify-center items-center"
          style={thumbAnimatedStyle}
        >
          {showText && (
            <Animated.View className="justify-center items-center">
              <Animated.View style={onTextStyle}>
                <Animated.Text
                  className="text-xs font-semibold"
                  style={thumbTextAnimatedStyle}
                >
                  {textLabels.on}
                </Animated.Text>
              </Animated.View>
              <Animated.View style={offTextStyle}>
                <Animated.Text
                  className="text-xs font-semibold"
                  style={thumbTextAnimatedStyle}
                >
                  {textLabels.off}
                </Animated.Text>
              </Animated.View>
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(Switch);
