export interface IUserSlice {
  data: {
    name: string;
    phone: string;
    email: string;
    accessToken: string;
    lastLogin: string;
    photoURL: string;
  } | null;
  loading: boolean;
  error: string | undefined | null;
  accessToken: string | null;
}
