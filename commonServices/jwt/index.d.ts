export declare const getJwt: ({ secret, accessOptions, refreshOptions, }: {
    secret: string;
    accessOptions?: {
        expiresIn?: string | number;
    };
    refreshOptions?: {
        expiresIn?: string | number;
    };
}) => {
    verifyAssessToken: (token: string) => any;
    verifyRefreshToken: (token: string) => any;
    createAccessToken: (payload: object) => any;
    createRefreshToken: (payload: object) => any;
};
export default getJwt;
