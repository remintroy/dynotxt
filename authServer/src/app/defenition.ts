import { Request } from "express";

// for express request's
export interface RequestDefention extends Request {
  user: {
    name: string;
    provider: string;
    uid: string;
    email: string;
    img: string;
    photoURL: string;
    phone: string;
    disabled: boolean;
    admin: boolean;
    createdAt: Date;
    lastLogin: Date;
    lastRefresh: Date;
    steps: number;
    preferences: {
      languages: [];
      subjects: [];
      knowlageLevel: number;
      difficulty: number;
    };
  };
  admin: Object;
}
