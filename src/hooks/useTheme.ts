import { useTheme as useNavigationTheme } from "@react-navigation/native";
import { AppTheme } from "../constants";

export const useTheme = (): AppTheme => {
  const theme = useNavigationTheme();

  // Cast the theme to AppTheme
  return theme as AppTheme;
};
