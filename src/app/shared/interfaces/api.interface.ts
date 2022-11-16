import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export interface ApiError {
  status: number;
  error: string;
  timestamp: string;
  path: string;
}

export type ErrorResponseDTO = HttpResponse<ApiError>;
