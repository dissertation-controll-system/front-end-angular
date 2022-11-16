export interface AppUserResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  fathersName: string;
  email: string;
  type: 'TEACHER' | 'STUDENT' | 'ADMIN';
}

export type AppUserUpdateDTO = Omit<AppUserResponseDTO, "id" | "email">;
