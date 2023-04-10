export interface IUserSlice {
  data: {
    name: string;
    email: string;
    uid: string;
    photoURL: string;
    phone: string;
    disabled: boolean;
    createdAt: Date;
    lastLogin: Date;
    accessToken: string | null;
  } | null;
  loading: boolean;
  error: string | undefined | null;
  accessToken: string | null;
}
