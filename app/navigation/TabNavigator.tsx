// navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AnalyticsScreen,
  GenerateLinkScreen,
  SettingsScreen,
} from "../screens";
import FloatingTabBar from "../components/FloatingTabBar";
import { TabBarVisibilityProvider } from "../contexts/TabBarVisibilityContext";

export type TabParamList = {
  GenerateLink: undefined;
  Analytics: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <TabBarVisibilityProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <FloatingTabBar {...props} />}
      >
        <Tab.Screen name="GenerateLink" component={GenerateLinkScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  );
}
