import { FacultyResponseDTO } from "./faculty-dto.interface";

export interface CathedraResponseDTO {
  id: number;
  name: string;
  faculty: FacultyResponseDTO;
}
