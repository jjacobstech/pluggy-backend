export interface AuthResponse {
  user: {
    id: string | undefined;
    email: string | undefined;
    name: string | undefined;
  };
  access_token: string;
}
