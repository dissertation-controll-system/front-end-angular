import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL_TOKEN } from "../constants/api-url.token";
import { FacultyResponseDTO } from "../interfaces/faculty-dto.interface";
import { PageRequestDTO, PageResponseDTO } from "../interfaces/page-dto.interface";
import { DefaultFacultyTableOptions } from "../constants/default-table-options.constant";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient, @Inject(API_URL_TOKEN) private apiUrl: string) { }

  getAllFaculties(pageOptions: PageRequestDTO<FacultyResponseDTO> = DefaultFacultyTableOptions):
    Observable<PageResponseDTO<FacultyResponseDTO>> {
      return this.http.get<PageResponseDTO<FacultyResponseDTO>>(
        `${this.apiUrl}/faculties`, {
        params: { ...pageOptions }
      });
  }

  createFaculty(facultyName: string): Observable<FacultyResponseDTO> {
    return this.http.post<FacultyResponseDTO>(`${this.apiUrl}/faculties`, {
      name: facultyName
    })
  }

  editFaculty(facultyId: number, facultyName: string): Observable<FacultyResponseDTO> {
    return this.http.put<FacultyResponseDTO>(`${this.apiUrl}/faculties/${facultyId}`, {
      name: facultyName
    })
  }

  deleteFaculty(facultyId: number): Observable<FacultyResponseDTO> {
    return this.http.delete<FacultyResponseDTO>(`${this.apiUrl}/faculties/${facultyId}`)
  }

  createCathedraToFaculty(facultyId: number, cathedraName: string): Observable<PageResponseDTO<FacultyResponseDTO>> {
    return this.http.post<PageResponseDTO<FacultyResponseDTO>>(
      `${this.apiUrl}/faculties/${facultyId}/cathedras`, {
        params: { name: cathedraName }
      }
    )
  }

  getAllCathedrasByFacultyId(facultyId: number): Observable<PageResponseDTO<FacultyResponseDTO>> {
    return this.http.get<PageResponseDTO<FacultyResponseDTO>>(
      `${this.apiUrl}/faculties/${facultyId}/cathedras`
    )
  }

  getCathedraByFacultyId(facultyId: number, cathedraId: number): Observable<PageResponseDTO<FacultyResponseDTO>> {
    return this.http.get<PageResponseDTO<FacultyResponseDTO>>(
      `${this.apiUrl}/faculties/${facultyId}/cathedras/${cathedraId}`
    )
  }
}
