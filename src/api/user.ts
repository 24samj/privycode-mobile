import { AxiosInstance } from "@/utils/axiosInstance.util";

export const fetchUserData = async (): Promise<{
  github_username: string;
  email: string;
}> => {
  const { data } = await AxiosInstance.get<{
    github_username: string;
    email: string;
  }>("/me");
  return data;
};
