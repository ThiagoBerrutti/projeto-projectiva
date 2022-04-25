import { Injectable, OnInit } from '@angular/core';
import { AuthResponse } from 'src/app/auth/auth-response';
import { AppConstants } from '../appConstants';
import { LoginRepository } from '../repositories/login-repository';
import { AuthToken } from '../models/auth-token';
import { Client } from '../models/client';
import { User } from '../models/user';
import { UserWithClients } from '../models/user-with-clients';
import { UserCredentials } from '../models/userCredentials';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit
{
    public localUser: User | undefined;

    // private userLogged!: boolean;

    constructor(private _userService: UserService, private _loginRepository: LoginRepository)
    {
        this.localUser = undefined;
    }

    ngOnInit(): void
    {
    }


    public getAuthTokenFromLocalStorage(): string | null
    {
        return window.localStorage.getItem(AppConstants.USER_AUTH_TOKEN_KEY);
    }


    private setAuthTokenOnLocalStorage(token: string)
    {
        window.localStorage.setItem(AppConstants.USER_AUTH_TOKEN_KEY, token);
    }


    private createToken(user: User): string
    {
        if (user instanceof Client)
        {
            return AuthToken.create(user.username, "client");
        }

        return AuthToken.create(user.username, "userWithClients");
    }

    public setUserLoggedOnLocalStorage(logged: boolean): void
    {
        // this.userLogged = logged;
        window.localStorage.setItem(AppConstants.USER_LOGGED_KEY, logged.toString());
    }

    public getUserLoggedFromLocalStorage(): string
    {
        return window.localStorage.getItem(AppConstants.USER_LOGGED_KEY) ?? "";
    }

    public getCurrentUser(): User | undefined
    {
        return this._loginRepository.getCurrentUser();
    }

    public isLogged(): boolean
    {
        let token: string | null = window.localStorage.getItem(AppConstants.USER_AUTH_TOKEN_KEY);
        if (!AuthToken.validate(token)) 
        {
            return false;
        }

        let user = this._loginRepository.getLoggedUserByToken(token!);

        return !!user && user == this.localUser
    }


    public isUsernameAvailable(username: string): boolean
    {
        let user: User | undefined = this._userService.getUserByUsername(username);
        return !user;
    }


    public registerUser(userCredentials: UserCredentials): AuthResponse<UserCredentials>
    {
        var usernameAvailable = this.isUsernameAvailable(userCredentials.username);
        if (!usernameAvailable)
        {
            var x = new AuthResponse(false, userCredentials, "User not registered");;
            return x;
        }

        let user = UserWithClients.factory(userCredentials.username, userCredentials.password);

        this._userService.registerUser(user);

        let authResponse = this.authenticateUser(new UserCredentials(user.username, user.password));
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
        let user = this._userService.getUserByUsername(credentials.username);
        if (user?.password != credentials.password)
        {
            return new AuthResponse<User>(false, user, "Invalid username / password");
        }

        let token = this.createToken(user);

        this._loginRepository.addLoggedUser(token, user.username);
        this.setAuthTokenOnLocalStorage(token);
        this.setUserLoggedOnLocalStorage(true);

        this.localUser = user;

        return new AuthResponse<User>(true, user, "User authenticated successfully");
    }


    public logoutUser(): AuthResponse<undefined>
    {
        let token = window.localStorage.getItem(AppConstants.USER_AUTH_TOKEN_KEY);
        if (!token)
        {
            return new AuthResponse<undefined>(false, undefined, "User not logged");
        }

        this._loginRepository.removeLoggedUser(token);
        window.localStorage.removeItem(AppConstants.USER_AUTH_TOKEN_KEY);
        this.localUser = undefined;

        return new AuthResponse<undefined>(true, undefined, "Logged out");
    }
}
