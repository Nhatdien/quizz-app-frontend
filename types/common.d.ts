export interface BaseFilter {
  pageSize?: number;
  pageNo?: number;
  from?: Date;
  to?: Date;
  textSearch?: string;
  status?: number;
}
