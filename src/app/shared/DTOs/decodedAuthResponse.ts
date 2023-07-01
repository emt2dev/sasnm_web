export class DecodedAuthResponse {
    constructor(public userId: string, public token: string, public refreshToken: string, public roles: string) {
        userId = userId;
        token = token;
        refreshToken = refreshToken;
        roles = roles;
    }
}