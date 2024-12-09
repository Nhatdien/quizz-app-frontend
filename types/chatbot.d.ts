export interface BaseContent {
  parts: {
    text: string;
  }[];
  role: string;
}

export interface MessageModel {
  contents: BaseContent[];
}

export interface SendMesRes {
  candidates: {
    content: BaseContent;
    modelVersion: string;
  }[];
  modelVersion: string;
}

export interface MessageFilter {
  pageSize?: number;
  pageNo?: number;
  from?: string; // ISO 8601 date string
  to?: string; // ISO 8601 date string
  textSearch?: string;
  status?: number;
}

export interface MessageFilterResponse {
  content: BaseContent[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
