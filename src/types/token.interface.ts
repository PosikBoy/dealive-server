export interface ITokenUser {
  userId: number;
  email: string;
}

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}

export interface IRefreshToken {
  id: number;
  refreshToken: string;
  userId: number;
}
