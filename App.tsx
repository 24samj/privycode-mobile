import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "react-native";
import { useColorScheme } from "nativewind";
import { AppTheme, DarkTheme, LightTheme } from "./src/constants";
import { AuthProvider, ToastProvider } from "./app/contexts";
import { AppContent } from "./app/components";
import { themes } from "./src/constants/Colors";

// App-wide React Query client (single instance)
const queryClient = new QueryClient();

export default function App() {
  const { colorScheme } = useColorScheme();
  const selectedTheme: AppTheme =
    colorScheme === "dark" ? DarkTheme : LightTheme;
  const barStyle = colorScheme === "dark" ? "light-content" : "dark-content";

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={selectedTheme.colors.primary}
      />
      <SafeAreaProvider
        className="flex-1"
        style={themes[colorScheme ?? "light"]}
      >
        <KeyboardProvider>
          <GestureHandlerRootView className="flex-1">
            <NavigationContainer theme={selectedTheme}>
              <QueryClientProvider client={queryClient}>
                <ToastProvider>
                  <AuthProvider>
                    <AppContent />
                  </AuthProvider>
                </ToastProvider>
              </QueryClientProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </SafeAreaProvider>
    </>
  );
}
