import { Pressable, StyleSheet, Modal } from "react-native";
import React from "react";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import { useTheme } from "@/hooks";
import clsx from "clsx";

type Props = {
  visible: boolean;
  onTapOutside: () => void;
  containerClassName?: string;
  children?: React.ReactNode;
};

const PopupModal = ({
  visible,
  onTapOutside,
  containerClassName,
  children,
}: Props) => {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onTapOutside}
    >
      <Animated.View
        entering={FadeIn.duration(200).easing(Easing.out(Easing.cubic))}
        exiting={FadeOut.duration(200).easing(Easing.out(Easing.cubic))}
        style={styles.container}
      >
        <Pressable
          onPress={onTapOutside}
          className="flex-1 justify-center items-center bg-black/50"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{ backgroundColor: colors.background }}
            className={clsx("p-4 rounded-2xl self-center", containerClassName)}
          >
            {children}
          </Pressable>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
