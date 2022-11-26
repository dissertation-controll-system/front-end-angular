export interface CathedraResponseDTO {
  id: number;
  name: string;
  facultyRef: FacultyRef
}

type FacultyRef = `/faculty/${number}`
