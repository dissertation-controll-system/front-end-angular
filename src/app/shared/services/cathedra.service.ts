import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL_TOKEN } from "../constants/api-url.token";
import { PageRequestDTO, PageResponseDTO } from "../interfaces/page-dto.interface";
import { FacultyResponseDTO } from "../interfaces/faculty-dto.interface";
import { DefaultTableOptions } from "../constants/default-table-options.constant";
import { Observable } from "rxjs";
import { CathedraResponseDTO } from "../interfaces/cathedra-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class CathedraService {

  constructor(private http: HttpClient, @Inject(API_URL_TOKEN) private apiUrl: string) { }

  getAllCathedras(pageOptions: PageRequestDTO<FacultyResponseDTO> = DefaultTableOptions):
    Observable<PageResponseDTO<CathedraResponseDTO>> {
    return this.http.get<PageResponseDTO<CathedraResponseDTO>>(
      `${this.apiUrl}/cathedras`, {
        params: { ...pageOptions }
      });
  }
}
