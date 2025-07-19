// screens/LoginScreen.tsx
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../../src/hooks";
import { LogoSection, GithubButton, FeaturesList } from "@/components";

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.background, colors.card, colors.accentPrimary]}
      className="flex-1 items-center justify-center px-8"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <LogoSection />
      <GithubButton onPress={login} />
      <FeaturesList />
    </LinearGradient>
  );
}
