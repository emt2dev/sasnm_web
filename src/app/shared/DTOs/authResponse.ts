export class AuthResponseDTO {
    constructor(public userId: string, public token: string, public refreshToken: string) {
        userId = userId;
        token = token;
        refreshToken = refreshToken;
    }
}