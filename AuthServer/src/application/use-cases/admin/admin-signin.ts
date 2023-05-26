import GetUtils from "dynotxt-common-services/build/utils";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";
import caseAdminCheckAccess from "./admin-check-access";
import GetJwt from "dynotxt-common-services/build/jwt";

export default async function caseAdminSignin(
  adminRepository: adminUserRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  authService: authServiceInterface,
  validator: validatorInteraface,
  jwtService: GetJwt,
  utilsService: GetUtils,
  email: string,
  password: string
) {
  if (!email) throw utilsService.createError(400, "Email is required");
  if (!password) throw utilsService.createError(400, "Password is required");

  await validator.isValidEmail(email);
  await validator.isValidPassword(password);

  // eslint-disable-next-line no-param-reassign
  email = email.trim();

  const adminUserDataFromDb = await caseAdminCheckAccess(adminRepository, utilsService, email);

  const matched = await authService.comparePasswordWithHash(password, adminUserDataFromDb.password);

  if (!matched) throw utilsService.createError(400, "Incorrect password");

  const tokens = jwtService.generateTokens({ email });

  await tokenRepository
    .addWithEmail(adminUserDataFromDb.email, tokens.refreshToken)
    .catch(utilsService.throwInternalError());
  adminUserDataFromDb.lastLogin = new Date();
  await adminUserDataFromDb.save().catch(utilsService.throwInternalError());

  return {
    ...tokens,
    email: adminUserDataFromDb.email,
    photoURL: adminUserDataFromDb.photoURL,
    name: adminUserDataFromDb.name,
    phone: adminUserDataFromDb.phone,
  };
}
