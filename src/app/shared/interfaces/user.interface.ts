export interface User {
  id: number;
  username: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}
