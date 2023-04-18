export default function createCreateRefreshToken(jwt: any, secret: string, options?: { expiresIn?: string | number }) {
  if (!options) options = {};
  return function createRefreshToken(payload: object) {
    return jwt.sign(payload, secret, options);
  };
}
