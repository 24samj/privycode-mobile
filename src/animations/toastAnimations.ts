import { Easing, withTiming } from "react-native-reanimated";
import { ANIMATION_DURATION } from "../constants";

const easing = Easing.bezier(0.5, 0.01, 0, 1);
const duration = ANIMATION_DURATION / 2;

export const getToastAnimation = (
  visible: boolean,
  toastHeight: number,
  offsetY: number
) => {
  "worklet";
  if (visible) {
    return {
      offsetY: withTiming(offsetY, { duration, easing }),
      opacity: withTiming(1, { duration: ANIMATION_DURATION / 1.75, easing }),
    };
  } else {
    return {
      offsetY: withTiming(-toastHeight, { duration, easing }),
      opacity: withTiming(0, { duration, easing }),
    };
  }
};
