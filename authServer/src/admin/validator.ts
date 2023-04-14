import validator from "validator";
import { adminAppConfig } from "../configs";
import { createError } from "dynotxt-common-services/utils/";

const config = adminAppConfig();

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

export const inputValidator = async (data: IInputValidator, required?: IInputValidatorRequired) => {
  try {
    // data provided
    const email = data.email ?? "";
    const password = data.password ?? "";
    const phone = data.phone ?? "";
    const name = data.name ?? "";
    const photoURL = data.photoURL ?? "";

    const output: IInputValidatorOutput = {
      email: null,
      password: null,
      phone: null,
      name: null,
      photoURL: null,
    };

    // validates email
    if (email || required?.email) {
      if (!email && required?.email) throw createError(400, "Email is Required");
      if (!validator.isEmail(email)) throw createError(400, `Invalid email`);
      // Email is good
      output.email = email?.toLowerCase().trim();
    }

    // password validation
    if (password || required?.password) {
      if (!password && required?.password) throw createError(400, "Password is Required");
      if (typeof password != "string") throw createError(400, `Password must be a string`);
      if (password.length < config.auth.minPasswordLength)
        throw createError(400, `Password must be at least ${config.auth.minPasswordLength} characters`);
      // Password is good
      output.password = password.trim();
    }

    // phone number validation
    if (phone || required?.phone) {
      if (!phone && required?.phone) throw createError(400, "Phone is Required");
      if (typeof phone !== "string") throw createError(400, `Invalid phone`);
      if (phone.trim().length < config.auth.minPhoneLength) throw createError(400, `Phone number is Invalid`);
      if (!validator.isMobilePhone(phone)) throw createError(400, `Phone number is Invalid`);
      // Phone is good
      output.phone = phone.trim();
    }

    // name validation
    if (name || required?.name) {
      if (!name && required?.name) throw createError(400, "Name is Required");
      if (typeof name !== "string") throw createError(400, `Invalid name`);
      if (name.trim().length < config.auth.minNameLength) throw createError(400, `Invalid name`);
      // Name is good
      output.name = name.trim();
    }

    // photoURL validation
    if (photoURL || required?.photoURL) {
      if (!photoURL && required?.photoURL) throw createError(400, "PhotoURL is Required");
      if (typeof photoURL !== "string") throw createError(400, "Invalid photoURL");
      if (!validator.isURL(photoURL.trim())) throw createError(400, "Invalid photoURL");
      // Photo URL good
      output.photoURL = photoURL.trim();
    }

    // returns outuput with valid data;
    return output;
  } catch (error) {
    throw error;
  }
};
