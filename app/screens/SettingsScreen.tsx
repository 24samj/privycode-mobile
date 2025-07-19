import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CircleUserRound } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useTheme } from "@/hooks";
import { Switch } from "@/components";
import { useSharedValue } from "react-native-reanimated";

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isOn = useSharedValue(colorScheme === "light");

  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  const handleToggleTheme = async () => {
    isOn.value = colorScheme === "light";
    // wait 100ms
    await new Promise((resolve) => setTimeout(resolve, 250));
    toggleColorScheme();
  };

  return (
    <View className="flex-1 bg-white pb-16 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white px-6 pb-4 pt-12 dark:bg-gray-900">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* User Profile Section */}
        <View className="mx-4 my-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
          <View className="flex-row items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <CircleUserRound color={colors.icon} />
            </View>
            <View className="ml-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                @{user?.github_username || "User"}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email || "No email provided"}
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="mx-4 my-2 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
          <SettingsItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Configure your notifications"
          />
          <Divider />
          <SettingsItem
            icon="shield-checkmark-outline"
            title="Privacy"
            subtitle="Manage your privacy settings"
          />
          <Divider />
          <SettingsItem
            icon="color-palette-outline"
            title="Appearance"
            subtitle={colorScheme === "dark" ? "Dark" : "Light"}
            rightElement={<Switch value={isOn} onPress={handleToggleTheme} />}
          />
        </View>

        <View className="mx-4 my-2 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
          <SettingsItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help with the app"
          />
          <Divider />
          <SettingsItem
            icon="information-circle-outline"
            title="About"
            subtitle="App version and information"
          />
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View
        className="px-6 pb-6"
        style={{ paddingBottom: Math.max(insets.bottom + 16, 24) }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full items-center rounded-xl bg-red-500 py-4"
        >
          <Text className="text-lg font-bold text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SettingsItem = ({
  icon,
  title,
  subtitle,
  rightElement,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  rightElement?: React.ReactNode;
}) => {
  return (
    <TouchableOpacity className="flex-row items-center p-4">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <Ionicons name={icon} size={20} color="#3b82f6" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-base font-medium text-gray-900 dark:text-white">
          {title}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </Text>
      </View>
      {rightElement ?? (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
};

const Divider = () => (
  <View className="ml-16 h-[1px] bg-gray-200 dark:bg-gray-700" />
);
