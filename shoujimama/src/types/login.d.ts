export interface loginType {
    code: string;
    username: string;
    password: string;
    validate: string;
}

export interface loginResultType {
    accessToken: string;
    refreshToken: string;
}