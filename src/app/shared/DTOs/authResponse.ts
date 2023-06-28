export class AuthResponseDTO {
    constructor(public UserId: string, public Token: string, public RefreshToken: string) {
        UserId = UserId;
        Token = Token;
        RefreshToken = RefreshToken;
    }
}