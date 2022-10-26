enum EmailActivationState {
  PENDING,
  COMPLETE,
  FAILED
}

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface SignupRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface AccountResponseDTO {
  id: number;
  username: string;
  email: string;
  active: boolean;
  emailActivationState: EmailActivationState;
  roles: string[];
  appUserRef: string;
}

export interface TokensResponseDTO {
  access_token: string;
  refresh_token: string;
}

export interface AuthorizationResponseDTO {
  account: AccountResponseDTO;
  tokens: TokensResponseDTO
}
