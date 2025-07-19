import { Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useTabBarTranslate } from "../contexts/TabBarVisibilityContext";

/**
 * Returns an `onScroll` handler that moves the floating tab bar proportionally
 * with the scroll offset. The bar starts translating as soon as the user
 * starts scrolling, up to `maxTranslation` pixels.
 */
export default function useHideTabBarOnScroll(maxTranslation = 40) {
  const translateY = useTabBarTranslate();

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;

    // We only care about downward scroll. Clamp between 0 and maxTranslation
    const clamped = Math.min(Math.max(offsetY, 0), maxTranslation);

    translateY.setValue(clamped);
  };

  return { onScroll };
} 