import { AppConstants } from "../appConstants";

export class AuthToken
{
    static validate(token: string | null): boolean
    {
        return !!token;
    }

    static getUsername(token: string): string
    {
        let fieldIndex = token.search(AppConstants.AUTH_TOKEN_USERNAME_FIELD);
        if (fieldIndex < 0)
        {
            return "";
        }

        let valueStartIndex = fieldIndex + AppConstants.AUTH_TOKEN_USERNAME_FIELD.length;
        let valueFinishIndex = token.indexOf(";", valueStartIndex) || token.length;

        let value = token.slice(valueStartIndex, valueFinishIndex);

        return value;
    }

    static getUserType(token: string): string
    {
        let fieldIndex = token.search(AppConstants.AUTH_TOKEN_TYPE_FIELD);
        if (fieldIndex < 0)
        {
            return "";
        }

        let valueStartIndex = fieldIndex + AppConstants.AUTH_TOKEN_TYPE_FIELD.length;
        let valueFinishIndex = token.indexOf(";", valueStartIndex) || token.length;

        let value = token.slice(valueStartIndex, valueFinishIndex);

        return value;
    }

    static create(username: string | number, type: string): string
    {
        return AppConstants.AUTH_TOKEN_BASE +
            AppConstants.AUTH_TOKEN_USERNAME_FIELD + username + ";" +
            AppConstants.AUTH_TOKEN_TYPE_FIELD + type + ";";
    }
}