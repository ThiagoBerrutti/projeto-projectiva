import { Injectable } from "@angular/core";
import { AppConstants } from "./appConstants";
import { User } from "./models/user";
import { UserService } from "./services/user.service";

@Injectable({ providedIn: 'root' })

export class LoginRepository
{
    private loggedUsers!: Map<string, string>;

    constructor(private _userService: UserService)
    {
        this.loggedUsers = new Map<string, string>(); // [token, username]
    }

    public getLoggedUsers(predicate?: (user: User) => boolean): User[]
    {
        let usernames = [...this.loggedUsers.values()];
        let result = this._userService.getUsersByUsernameRange(usernames);

        return predicate? result.filter(predicate) : result;
    }

    public getCurrentUser(): User | undefined
    {        
        let token = window.localStorage.getItem(AppConstants.USER_AUTH_TOKEN_KEY);
        if (!token)
        {
            return undefined;
        }
        
        return this.getLoggedUserByToken(token);
    }


    public getLoggedUserByToken(token: string): User | undefined
    {
        let username = this.loggedUsers.get(token);
        if (!username) return undefined;

        return this._userService.getUserByUsername(username);
    }

    public addLoggedUser(token: string, username: string): void
    {
        this.loggedUsers.set(token, username);
    }

    public removeLoggedUser(token: string): void
    {
        this.loggedUsers.delete(token);
    }
}