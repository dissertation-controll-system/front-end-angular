enum EmailActivationState {
  PENDING,
  COMPLETE,
  FAILED
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
