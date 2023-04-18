declare const _default: {
    getEmail: (AccountEmail: string, password: string) => {
        sendOtp: (toEmail: string, otp: string) => Promise<void>;
    };
    getUtils: () => {
        createError: (code: number, error: string, optionalData?: object) => {
            message: any;
            error: string;
            code: number;
        };
    };
    getJwt: ({ secret, options }: {
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
};
export default _default;
export declare const getEmail: (AccountEmail: string, password: string) => {
    sendOtp: (toEmail: string, otp: string) => Promise<void>;
};
export declare const getUtils: () => {
    createError: (code: number, error: string, optionalData?: object) => {
        message: any;
        error: string;
        code: number;
    };
};
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
