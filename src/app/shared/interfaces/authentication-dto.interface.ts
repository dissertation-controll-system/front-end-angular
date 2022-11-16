import { AccountResponseDTO } from "./account-dto.interface";

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface TokensResponseDTO {
  access_token: string;
  refresh_token: string;
}

export interface AuthorizationResponseDTO {
  account: AccountResponseDTO;
  tokens: TokensResponseDTO
}
