import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts";
import * as SplashScreen from "expo-splash-screen";

interface SplashScreenManagerProps {
  children: React.ReactNode;
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  fade: true,
});

const SplashScreenManager: React.FC<SplashScreenManagerProps> = ({
  children,
}) => {
  const { isAuthLoading } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (!isAuthLoading) {
      // Hide splash screen once both contexts are done loading
      await SplashScreen.hideAsync();
    }
  }, [isAuthLoading]);

  if (isAuthLoading) {
    // Keep showing splash screen
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} className="flex-1">
      {children}
    </SafeAreaView>
  );
};

export default SplashScreenManager;
