export class AppConstants 
{
    public static readonly USER_AUTH_TOKEN_KEY: string = "userAuthToken";
    public static readonly USER_LOGGED_KEY: string = "userLogged";

    public static readonly AUTH_TOKEN_BASE: string = "AUTH_TOKEN:";

    public static readonly AUTH_TOKEN_TYPE_FIELD: string = "type=";
    public static readonly AUTH_TOKEN_USERNAME_FIELD: string = "userName=";

    // public static readonly AUTH_USER_TOKEN_BASE: string = this.AUTH_TOKEN_BASE + this.AUTH_TOKEN_TYPE_FIELD.replace("TYPE", "user");
    // public static readonly AUTH_CLIENT_TOKEN_BASE: string = this.AUTH_TOKEN_BASE + this.AUTH_TOKEN_TYPE_FIELD.replace("TYPE", "client");

    public static readonly USER_PASSWORD_MIN_LENGTH = 4;
}