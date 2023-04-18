export default function createVerifyRefreshToken({ jwt, secret }) {
  return function verifyRefreshToken(token: string) {
    return jwt.verify(token, secret);
  };
}
