export interface IUserSlice {
  data: object | null;
  loading: boolean;
  error: string | undefined | null;
  accessToken: string | null;
}
