export interface ApiDataModel{
  info: {
    count: number;
    pages: number;
    next: string|null;
    prev: string|null;
  };
  results: any[];
}
