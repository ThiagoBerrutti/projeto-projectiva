import { AppConstants } from "../appConstants";

export class AuthToken 
{
    //private _value: string; 

    //get value() { return this._value }

    

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

    // setId(id?: string | number): string
    // {
    //     let usernameFieldString = AppConstants.AUTH_TOKEN_USERNAME_FIELD;

    //     let fieldIndex = this.value.search(usernameFieldString);
    //     if (fieldIndex < 0)
    //     {
    //         return this.value + usernameFieldString + id;
    //     }

    //     this._value = this.value.replace(usernameFieldString, usernameFieldString + id + ";");

    //     return this.value;
    // }


    static create(id: string | number, type:string):string
    {
        return AppConstants.AUTH_TOKEN_BASE + 
                AppConstants.AUTH_TOKEN_USERNAME_FIELD + id + ";" +
                AppConstants.AUTH_TOKEN_TYPE_FIELD + type + ";";
    }
}