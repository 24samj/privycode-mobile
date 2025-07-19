import React from "react";
import { View, Text, Pressable, Animated } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as WebBrowser from "expo-web-browser";
import { CustomColors } from "../../../src/constants/Colors";
import { ExternalLink, Copy, Edit, Trash2 } from "lucide-react-native";
import { useToast } from "@/app/contexts";

interface Props {
  item: ViewerLink;
  colors: CustomColors;
  index: number;
  onEdit: (item: ViewerLink) => void;
  onDelete: (item: ViewerLink) => void;
}

const LinkItem: React.FC<Props> = ({
  item,
  colors,
  index,
  onEdit,
  onDelete,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { pushToast } = useToast();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const linkUrl = `https://www.privycode.com/view/${item.token}`;

  const copyLink = () => {
    Clipboard.setStringAsync(linkUrl);
    pushToast({
      title: "Link copied",
      description: "Now you can share it anywhere",
    });
  };

  const openLink = () => {
    WebBrowser.openBrowserAsync(linkUrl);
  };

  return (
    <Animated.View
      className="rounded-xl p-5 mb-4 shadow-md border"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        opacity: fadeAnim,
      }}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text
          className="text-lg font-bold flex-1"
          style={{ color: colors.text }}
        >
          {item.repo_name}
        </Text>
        <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          <Text
            className="text-sm font-medium"
            style={{ color: colors.primary }}
          >
            {item.view_count}/{item.max_views}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-3 gap-8">
        <Pressable
          className="flex-row items-center flex-1 bg-gray-50 dark:bg-gray-800 py-2 rounded-lg px-3"
          onPress={openLink}
        >
          <Text
            className="text-sm flex-1"
            style={{ color: colors.primary }}
            numberOfLines={1}
          >
            {linkUrl}
          </Text>
          <ExternalLink size={16} color={colors.primary} />
        </Pressable>
        <Pressable
          onPress={copyLink}
          accessibilityLabel="Copy link"
          className="bg-gray-100 dark:bg-gray-800 py-2 rounded-lg"
        >
          <Copy size={18} color={colors.iconExtra} />
        </Pressable>
      </View>

      <View className="flex-row justify-between items-center mt-1">
        <Text
          className="text-xs font-medium"
          style={{ color: colors.textExtra }}
        >
          Expires: {new Date(item.expires_at).toLocaleDateString()}
        </Text>
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => onEdit(item)}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
          >
            <Edit size={20} color={colors.iconExtra} />
          </Pressable>
          <Pressable
            onPress={() => onDelete(item)}
            className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
          >
            <Trash2 size={20} color={colors.error} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

export default LinkItem;
