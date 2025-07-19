import { View, KeyboardAvoidingView, Animated } from "react-native";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "../../src/constants/Colors";
import { useToast } from "../contexts";
import {
  InputField,
  InfoCard,
  GLHeader,
  SubmitButton,
  SelectRepoButton,
} from "../components";
import useHideTabBarOnScroll from "../hooks/useHideTabBarOnScroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "@/api";
import * as Clipboard from "expo-clipboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const GenerateLinkScreen = () => {
  const theme = useTheme() as AppTheme;
  const colors = theme.colors;
  const { onScroll } = useHideTabBarOnScroll();
  const { pushToast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    repoName: "",
    expirationInDays: 30,
    maxViews: 100,
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Animation values
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  // React Query mutation for creating links
  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: async (data) => {
      // Copy to clipboard
      await Clipboard.setStringAsync(
        `https://privycode.com/view/${data.viewer_url.split("/").pop()}`,
      );

      // Show success toast
      pushToast({
        title: "Success",
        description: "Link generated and copied to clipboard successfully",
      });

      // Reset form
      setFormData({
        repoName: "",
        expirationInDays: 30,
        maxViews: 100,
      });
      setErrors({});
      setFocusedField(null);

      // Invalidate dashboard data
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate link";

      // Special handling for 404 errors (repository not found)
      if (error.response?.status === 404) {
        pushToast({
          title: "Repository Not Found",
          description:
            "Please ensure the repository name exactly matches what exists on GitHub",
        });
      } else {
        pushToast({
          title: "Error",
          description: errorMessage,
        });
      }
    },
  });

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateField = (field: string, value: string | number) => {
    const newErrors = { ...errors };

    switch (field) {
      case "repoName":
        if (!value || value.toString().trim() === "") {
          newErrors.repoName = "Repository name is required";
        } else if (value.toString().length < 3) {
          newErrors.repoName = "Repository name must be at least 3 characters";
        } else {
          delete newErrors.repoName;
        }
        break;
      case "expirationInDays":
        if (!value || Number(value) <= 0) {
          newErrors.expirationInDays = "Expiration must be at least 1 day";
        } else if (Number(value) > 365) {
          newErrors.expirationInDays = "Maximum expiration is 365 days";
        } else {
          delete newErrors.expirationInDays;
        }
        break;
      case "maxViews":
        if (!value || Number(value) <= 0) {
          newErrors.maxViews = "Maximum views must be at least 1";
        } else if (Number(value) > 10000) {
          newErrors.maxViews = "Maximum views cannot exceed 10,000";
        } else {
          delete newErrors.maxViews;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    // Check if there are any errors
    if (Object.keys(errors).length > 0) return false;

    // Check if all required fields are filled
    if (!formData.repoName.trim()) return false;
    if (!formData.expirationInDays || formData.expirationInDays <= 0)
      return false;
    if (!formData.maxViews || formData.maxViews <= 0) return false;

    return true;
  }, [formData, errors]);

  const handleSubmit = async () => {
    // Validate all fields first
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    // If form is not valid, don't proceed
    if (!isFormValid) {
      pushToast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
      });
      return;
    }

    // Submit with React Query
    createLinkMutation.mutate({
      repo_name: formData.repoName,
      expires_in_days: formData.expirationInDays,
      max_views: formData.maxViews,
    });
  };

  const renderInputField = (
    field: keyof typeof formData,
    label: string,
    placeholder: string,
    icon: string,
    keyboardType: "default" | "numeric" = "default",
  ) => {
    const isFocused = focusedField === field;
    const hasError = errors[field];
    const value = formData[field];

    return (
      <Animated.View
        className=""
        style={[
          {
            opacity: fadeAnimation,
            transform: [
              {
                translateY: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <InputField
          label={label}
          placeholder={placeholder}
          icon={icon}
          value={value}
          keyboardType={keyboardType}
          error={hasError}
          isFocused={isFocused}
          onChange={(text) =>
            handleChange(
              field,
              keyboardType === "numeric" ? parseInt(text) || 0 : text,
            )
          }
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
      </Animated.View>
    );
  };

  return (
    // <KeyboardAvoidingView
    //   className="flex-1"
    //   style={{ backgroundColor: colors.background }}
    // >
    /* <Animated.ScrollView
        className="flex-grow"
        contentContainerClassName="pb-16 px-4"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      > */
    <KeyboardAwareScrollView
      // behaviour

      contentContainerClassName="px-4 pb-16"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      {/* Header */}
      <GLHeader fadeAnim={fadeAnimation} slideAnim={slideAnimation} />

      {/* Form Section */}
      <Animated.View
        className="gap-8 rounded-2xl border p-6 shadow-lg"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: fadeAnimation,
          transform: [
            {
              translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0],
              }),
            },
          ],
        }}
      >
        {renderInputField(
          "repoName",
          "Repository Name",
          "e.g., my-awesome-project",
          "folder-outline",
        )}

        <View className="flex-row justify-between gap-2">
          <View className="w-3/5">
            {renderInputField(
              "expirationInDays",
              "Expiration (days)",
              "30",
              "time-outline",
              "numeric",
            )}
          </View>
          <View className="flex-1">
            {renderInputField(
              "maxViews",
              "Max Views",
              "100",
              "eye-outline",
              "numeric",
            )}
          </View>
        </View>

        {/* Info Cards */}
        <View className="gap-3">
          <InfoCard
            icon="shield-checkmark"
            text="Links automatically expire and become inaccessible"
            iconColor={colors.success}
          />
          <InfoCard
            icon="analytics"
            text="Track views and monitor access in real-time"
            iconColor={colors.primary}
          />
        </View>

        {/* Submit Button */}
        <SubmitButton
          onPress={handleSubmit}
          isLoading={createLinkMutation.isPending}
          isDisabled={!isFormValid}
          colors={colors}
        />
        <SelectRepoButton
          onPress={() => {}}
          selectedRepo={formData.repoName}
          disabled={createLinkMutation.isPending}
        />
      </Animated.View>
    </KeyboardAwareScrollView>
    // {/* </Animated.ScrollView> */}
    // {/* </KeyboardAvoidingView> */}
  );
};

export default GenerateLinkScreen;
