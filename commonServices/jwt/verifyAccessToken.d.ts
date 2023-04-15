export default function createVerifyAccessToken({ jwt, secret }: {
    jwt: any;
    secret: any;
}): (token: string) => any;
