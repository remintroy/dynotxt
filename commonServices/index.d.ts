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
