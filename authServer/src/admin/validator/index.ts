import validator from "validator";
import { adminAppConfig } from "../../configs";
import { createError } from "../../utils";
import { IInputValidator, IInputValidatorOutput, IInputValidatorRequired } from "./types";

const config = adminAppConfig();

export const inputValidator = async (data: IInputValidator, required?: IInputValidatorRequired) => {
  try {
    // data provided
    const email = data.email?.toLowerCase() ?? "";
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
    if (email || required.email) {
      if (email.length == 0) throw createError(400, "Email required");
      if (!validator.isEmail(email)) throw createError(400, `Invalid email`);
      // Email is good
      output.email = email;
    }

    // password validation
    if (password || required.password) {
      if (typeof password != "string") throw createError(400, `Password must be a string`);
      if (password.length == 0) throw createError(400, `Password required`);
      if (password.length < config.minPasswordLength)
        throw createError(400, `Password must be at least ${config.minPasswordLength} characters`);
      // Password is good
      output.password = password;
    }

    // phone number validation
    if (phone || required.phone) {
      if (typeof phone !== "string") throw createError(400, `Invalid phone`);
      if (phone.length < config.minPhoneLength) throw createError(400, `Phone number is Invalid`);
      if (validator.isMobilePhone(phone)) throw createError(400, `Phone number is Invalid`);
      // Phone is good
      output.phone = phone;
    }

    // name validation
    if (name || required.name) {
      if (typeof name !== "string") throw createError(400, `Invalid name`);
      if (name.length < config.minNameLength) throw createError(400, `Invalid name`);
      // Name is good
      output.name = name;
    }

    // photoURL validation
    if (photoURL || required.photoURL) {
      if (typeof photoURL !== "string") throw createError(400, "invalid photoURL");
      if (!validator.isURL(photoURL)) throw createError(400, "Invalid photoURL");
      // Photo URL good
      output.photoURL = photoURL;
    }

    // returns outuput with valid data;
    return output;
  } catch (error) {
    throw error;
  }
};
