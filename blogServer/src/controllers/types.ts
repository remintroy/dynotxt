export interface IRequest {
  query?: any;
  params?: any;
  body?: any;
  method: string;
  path: string;
}
