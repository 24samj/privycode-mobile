import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

export const storeToken = async (value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, value);
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Optional: Add delete token function
export const deleteToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error deleting token:", error);
    throw error;
  }
};

// Optional: Check if token exists
export const hasToken = async (): Promise<boolean> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token != null;
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
};
