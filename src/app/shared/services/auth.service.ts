import { Injectable, OnInit, Type } from '@angular/core';
import { AuthResponse } from 'src/app/auth/auth-response';
import { AppConstants } from '../appConstants';
import { User } from '../models/user';
import { UserCredentials } from '../models/userCredentials';
import { UsersMock } from '../usersMock';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit
{
    private userLogged!: boolean;

    public registeredUsers!: Map<string, User>;

    constructor()
    {
        this.registeredUsers = new Map<string, User>(); // [username, user];

        UsersMock.users.forEach(u =>
        {
            this.registeredUsers.set(u.userName, u);
        });
    }

    ngOnInit(): void
    {
    }


    private getUser(userName: string): User | undefined
    {
        return this.registeredUsers.get(userName);
    }

    private getAuthTokenFromLocalStorage(): string | null
    {
        return window.localStorage.getItem(AppConstants.USER_AUTH_TOKEN_KEY);
    }

    private setAuthTokenOnLocalStorage(token: string)
    {
        window.localStorage.setItem(AppConstants.USER_AUTH_TOKEN_KEY, token);
    }

    private createToken(user: User): string
    {
        return AppConstants.AUTH_TOKEN_BASE + "_" + user.userName;
    }

    public setUserLoggedOnLocalStorage(logged: boolean): void
    {
        this.userLogged = logged;
        window.localStorage.setItem(AppConstants.USER_LOGGED_KEY, logged.toString());
    }

    public getUserLoggedFromLocalStorage(): string
    {
        return window.localStorage.getItem(AppConstants.USER_LOGGED_KEY) ?? "";
    }

    public isLogged(): boolean
    {
        return window.localStorage.getItem(AppConstants.USER_LOGGED_KEY) == "true";
    }

    public isUserNameAvailable(userName: string): boolean
    {
        let user: User | undefined = this.getUser(userName);
        return !user;
    }


    public registerUser(userCredentials: UserCredentials): AuthResponse<UserCredentials>
    {
        var userNameAvailable = this.isUserNameAvailable(userCredentials.userName);
        if (!userNameAvailable)
        {
            var x = new AuthResponse(false, userCredentials, "User not registered");;
            console.log(x);
            return x;
        }

        let user = User.factory(userCredentials.userName, userCredentials.password, this.registeredUsers.size + 1);

        this.registeredUsers.set(user.userName, user);

        let authResponse = this.authenticateUser(new UserCredentials(user.userName, user.password));
        let response = authResponse;
        if (!authResponse.success)
        {
            response.message = "User successfully registered, but couldn't authenticate";
            return response;
        }

        response.message = "User registered successfully";

        return response;
    }


    public authenticateUser(credentials: UserCredentials): AuthResponse<User>
    {
        let user = this.getUser(credentials.userName);
        if (user?.password != credentials.password)
        {
            return new AuthResponse<User>(false, user, "Invalid username / password");
        }

        let token = this.getAuthTokenFromLocalStorage();
        if (!token || !this.userLogged)
        {
            token = this.createToken(user);
            this.setAuthTokenOnLocalStorage(token);
        }

        this.setUserLoggedOnLocalStorage(true);

        return new AuthResponse<User>(true, user, "User authenticated successfully");
    }
}
