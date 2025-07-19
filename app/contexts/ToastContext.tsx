import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LayoutChangeEvent, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../src/hooks";
import { getToastAnimation } from "../../src/animations/toastAnimations";
import { ANIMATION_DURATION, TOAST_DURATION } from "../../src/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastState = {
  visible: boolean;
  title: string;
  description: string;
};

interface ToastContextType {
  toast: ToastState;
  pushToast: (toast: {
    title: string;
    description: string;
    duration?: number;
  }) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Define the context type
type GestureContext = {
  startY: number;
};

const Toast: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  const { colors } = useTheme();
  const { toast, hideToast } = useToast();
  const { top } = useSafeAreaInsets();
  const [toastHeight, setToastHeight] = useState<number>(0);
  const offsetY = useSharedValue(-toastHeight);
  const opacity = useSharedValue(0);
  const gestureContext = useSharedValue<GestureContext>({ startY: 0 });

  useEffect(() => {
    const { offsetY: newOffsetY, opacity: newOpacity } = getToastAnimation(
      toast.visible,
      toastHeight,
      top + 16
    );

    offsetY.value = newOffsetY;
    opacity.value = newOpacity;
  }, [toast.visible, toastHeight]);

  const onLayout = (event: LayoutChangeEvent): void => {
    const { height } = event.nativeEvent.layout;
    setToastHeight(height);
  };

  // Defining the gesture using the new Gesture API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Save the current offset as context
      gestureContext.value = { startY: offsetY.value };
    })
    .onUpdate((event) => {
      // Update the offset based on gesture translation
      offsetY.value = gestureContext.value.startY + event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY < -20) {
        // Swipe up enough to dismiss
        runOnJS(hideToast)();
      } else {
        // Not swiped enough, return to original position
        offsetY.value = withSpring(toastHeight / 3);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.toastContainer, animatedStyle]}>
        <Pressable
          onPress={onPress}
          style={[
            styles.toast,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onLayout={onLayout}
        >
          {toast.title && (
            <Text
              style={[
                styles.toastTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              {toast.title}
            </Text>
          )}
          <Text
            style={[
              styles.toastDescription,
              {
                color: colors.textExtra,
              },
            ]}
          >
            {toast.description}
          </Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    zIndex: 9999,
    width: "100%",
    alignItems: "center",
  },
  toast: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "90%",
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  toastDescription: {
    fontSize: 14,
  },
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: "",
    description: "",
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const pushToast = ({
    title,
    description,
    duration = TOAST_DURATION,
  }: {
    title: string;
    description: string;
    duration?: number;
  }) => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (clearTextTimeoutRef.current) {
      clearTimeout(clearTextTimeoutRef.current);
    }

    setToast({ visible: true, title, description });

    // Start the hide animation after duration
    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));

      // Clear the text content after both durations
      clearTextTimeoutRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, title: "", description: "" }));
      }, ANIMATION_DURATION);
    }, duration);
  };

  const hideToast = () => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (clearTextTimeoutRef.current) {
      clearTimeout(clearTextTimeoutRef.current);
    }

    setToast((prev) => ({ ...prev, visible: false }));

    // Clear the text content after animation completes
    clearTextTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, title: "", description: "" }));
    }, ANIMATION_DURATION);
  };

  return (
    <ToastContext.Provider value={{ toast, pushToast, hideToast }}>
      <Toast onPress={hideToast} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
