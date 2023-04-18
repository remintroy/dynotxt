export default function createVerifyAccessToken({ jwt, secret }) {
  return function verifyAssessToken(token: string) {
    return jwt.verify(token, secret);
  };
}
