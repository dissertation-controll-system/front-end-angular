import { PageRequestDTO } from "../interfaces/page-dto.interface";
import { FacultyResponseDTO } from "../interfaces/faculty-dto.interface";

export const DefaultTableOptions: PageRequestDTO<FacultyResponseDTO> = {
  page: 0,
  size: 10,
  sort: ['id,ASC']
};

