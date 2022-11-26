export interface PageResponseDTO<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number:	number;
  sort:	ISortObject;
  pageable:	IPageableObject;
  numberOfElements:	number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface IPageableObject {
  offset:	number;
  sort:	ISortObject;
  pageNumber:	number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface ISortObject {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageRequestDTO<T> {
  page: number;
  size: number;
  sort?: ISortParams<T>[];
}

export type ISortDirection = 'ASC' | 'DESC';
export type ISortParams<T> = `${string & keyof T},${ISortDirection}`
