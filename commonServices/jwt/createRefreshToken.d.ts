export default function createCreateRefreshToken(jwt: any, secret: string, options?: {
    expiresIn?: string | number;
}): (payload: object) => any;