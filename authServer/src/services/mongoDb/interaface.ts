export interface IAdminUser {
  name: string;
  email: string;
  uid: string;
  password: string;
  img: string;
  photoURL: string;
  phone: string;
  disabled: boolean;
  admin: boolean;
  createdAt: Date;
  lastLogin: Date;
  lastRefresh: Date;
  phoneVerified: boolean;
  emailVerified: boolean;
}

export interface IAdminRefreshToken {
  value: string;
  uid: string;
  createdAt: Date;
}

export interface IUser {
  name: string;
  email: string;
  uid: string;
  provider: string;
  img: string;
  photoURL: string;
  phone: string;
  referal: string;
  referedBy: string;
  disabled: boolean;
  admin: boolean;
  createdAt: Date;
  lastLogin: Date;
  lastRefresh: Date;
  phoneVerified: boolean;
  emailVerified: boolean;
}

export interface IRefreshToken {
  value: string;
  uid: string;
  createdAt: Date;
}
