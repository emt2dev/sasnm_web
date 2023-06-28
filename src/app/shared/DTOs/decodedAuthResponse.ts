export class DecodedAuthResponse {
    constructor(public UserId: string, public Token: string, public RefreshToken: string, public Roles: string) {
        UserId = UserId;
        Token = Token;
        RefreshToken = RefreshToken;
        Roles = Roles;
    }
}