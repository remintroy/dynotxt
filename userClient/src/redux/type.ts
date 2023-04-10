export interface IUserSlice {
  data: {
    uid: string;
    name: string;
    phone: string;
    email: string;
    accessToken: string;
    lastLogin: string;
    photoURL: string;
    dob: string;
    gender: string;
    privateAccount: boolean;
  } | null;
  loading: boolean;
  error: string | undefined | null;
  accessToken: string | null;
}
