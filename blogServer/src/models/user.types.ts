export interface IUser {
  name: string;
  email: string;
  uid: string;
  photoURL: string;
  privateAccount: boolean;
  dob: Date;
  gender: string;
  phone: string;
  disabled: boolean; 
  createdAt: Date;
  phoneVerified: boolean;
  emailVerified: boolean;
}
