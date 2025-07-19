import { AxiosInstance } from "../utils";

export const fetchDashboard = async (): Promise<ViewerLink[]> => {
  const { data } = await AxiosInstance.get<ViewerLink[]>("/dashboard");
  console.log(data);
  return data;
};

export const deleteLink = async (id: number): Promise<void> => {
  await AxiosInstance.delete(`/delete-link/${id}`);
};

export const createLink = async (linkData: {
  repo_name: string;
  expires_in_days: number;
  max_views: number;
}): Promise<{ viewer_url: string }> => {
  const { data } = await AxiosInstance.post<{ viewer_url: string }>(
    "/generate-viewer-link",
    linkData
  );
  console.log(data);
  return data;
};
