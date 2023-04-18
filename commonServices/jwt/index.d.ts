export declare const getJwt: ({ secret, options }: {
    secret: string;
    options: {
        expiresIn: string | number;
    };
}) => {
    verifyAssessToken: (token: string) => any;
    verifyRefreshToken: (token: string) => any;
    createAccessToken: (payload: string) => any;
    createRefreshToken: (payload: string) => any;
};
export default getJwt;
