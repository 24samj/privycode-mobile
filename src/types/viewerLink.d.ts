/**
 * ViewerLink interface representing a shared repository link
 */
interface ViewerLink {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  User: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Email: string;
    GitHubToken: string;
    GitHubUsername: string;
    ViewerLinks: any | null;
  };
  expires_at: string;
  max_views: number;
  repo_name: string;
  token: string;
  user_id: number;
  view_count: number;
  to?: string; // Optional property used in LinkItem component
}
