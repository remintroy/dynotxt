import { IAdminUser } from "../../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";

export default async function signinAdmin(
  adminRepository: ReturnType<typeof adminUserRepositoryInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  authService: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  email: string,
  password: string
) {
  if (!email) throw createError(400, "Email is required");
  if (!password) throw createError(400, "Password is required");

  await validator.isValidEmail(email);
  await validator.isValidPassword(password);

  // eslint-disable-next-line no-param-reassign
  email = email.trim();

  let userData: IAdminUser;

  try {
    userData = await adminRepository.getByEmail(email);
  } catch (error) {
    throw createError(500, "Faild to fetch user data", error);
  }

  if (!userData) throw createError(400, "Account with this email not exist");

  const matched = await authService.comparePasswordWithHash(
    password,
    userData.password
  );

  if (!matched) throw createError(400, "Incorrect password");

  const tokens = authService.adminTokensForUser(email);

  try {
    await tokenRepository.addWithEmail(userData.email, tokens.refreshToken);
    await adminRepository.update(userData.email, { lastLogin: new Date() });
  } catch (error) {
    throw createError(500, "Faild to login, Error updating login status");
  }

  return {
    ...tokens,
    email: userData.email,
    photoURL: userData.photoURL,
    name: userData.name,
    phone: userData.phone,
  };
}
