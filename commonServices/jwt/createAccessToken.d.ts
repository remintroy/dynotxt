export default function createCreateAccessToken(jwt: any, secret: string, options?: {
    expiresIn?: string | number;
}): (payload: string) => any;
