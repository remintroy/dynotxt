export interface IInputValidator {
  email?: string;
  password?: string;
  phone?: string;
  name?: string;
  photoURL?: string;
}
export interface IInputValidatorOutput {
  email: string;
  password: string;
  phone: string;
  name: string;
  photoURL: string;
}
export interface IInputValidatorRequired {
  email?: boolean;
  password?: boolean;
  phone?: boolean;
  name?: boolean;
  photoURL?: boolean;
}
