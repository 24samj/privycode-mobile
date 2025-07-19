interface User {
  readonly id: number;
  readonly email: string;
  readonly githubUsername: string;
  readonly githubToken: string;
  readonly createdAt?: string; // ISO date string
  readonly updatedAt?: string; // ISO date string
}
