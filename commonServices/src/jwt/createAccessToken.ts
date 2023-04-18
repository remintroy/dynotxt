export default function createCreateAccessToken(jwt: any, secret: string, options?: { expiresIn?: string | number }) {
  if (!options) options = {};
  return function createAssessToken(payload: string) {
    return jwt.sign(payload, secret, options);
  };
}
