export default function createVerifyRefreshToken({ jwt, secret }: {
    jwt: any;
    secret: any;
}): (token: string) => any;
