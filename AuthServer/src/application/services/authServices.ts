import authServiceImpl from "../../frameworks/services/authServices";

const authServiceInterface = (authService: authServiceImpl) => {
  const verifyIdToken = authService.verifyIdToken;
  const createOtp = authService.createOtp;
  const createPassordHash = authService.createPassordHash;
  const comparePasswordWithHash = authService.comparePasswordWithHash;

  return {
    verifyIdToken,
    createOtp,
    createPassordHash,
    comparePasswordWithHash,
  };
};

type authServiceInterface = ReturnType<typeof authServiceInterface>;
export default authServiceInterface;
