import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useAuth } from "../contexts";
import { AppStack } from "../navigation";
import { LoginScreen } from "../screens";
import SplashScreenManager from "./SplashScreenManager";

type RootStackParamList = {
  Login: undefined;
  AppStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "fade_from_bottom",
};

const AppContent: React.FC = () => {
  const { token } = useAuth();

  return (
    <SplashScreenManager>
      <Stack.Navigator screenOptions={screenOptions}>
        {token ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </SplashScreenManager>
  );
};

export default AppContent;
