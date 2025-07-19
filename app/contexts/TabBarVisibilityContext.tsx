import React, { createContext, useContext, useRef } from "react";
import { Animated } from "react-native";

// Context that shares an Animated.Value controlling the tab bar translation
const TabBarTranslateContext = createContext<Animated.Value | null>(null);

export const TabBarVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // 0 = visible, positive values → pushed further down (hidden)
  const translateY = useRef(new Animated.Value(0)).current;

  return (
    <TabBarTranslateContext.Provider value={translateY}>
      {children}
    </TabBarTranslateContext.Provider>
  );
};

export function useTabBarTranslate() {
  const value = useContext(TabBarTranslateContext);
  if (!value) {
    throw new Error(
      "useTabBarTranslate must be used within a TabBarVisibilityProvider"
    );
  }
  return value;
}
