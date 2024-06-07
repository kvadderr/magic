export interface steamLoginData {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}
export interface UserData {
  avatar: string;
  balance: 100;
  id: string;
  role: string;
  steamId: string;
  name: string;
}
