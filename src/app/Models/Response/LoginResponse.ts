export class LoginResponse {
    Data: TokenData;
}

export class TokenData {
    access_token: string
    expires_in: number
}