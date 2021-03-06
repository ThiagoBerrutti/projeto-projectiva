import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppConstants } from '../appConstants';
import { LoginRepository } from '../repositories/login-repository';
import { Client } from '../models/client';
import { User } from '../models/user';
import { UserWithClients } from '../models/user-with-clients';
import { UserRepository } from '../repositories/user-repository';
import { AuthService } from './auth.service';
import { ServiceResponse } from './service-response';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    constructor(private _userRepository: UserRepository) 
    {
    }

    public getUsers(predicate?: (user: User) => boolean): User[]
    {
        return this._userRepository.getUsers(predicate);
    }

    public getUserByUsername(userName: string): User | undefined
    {
        return this._userRepository.getUserByUsername(userName);
    }

    public getUsersByUsernameRange(usernames: string[])
    {
        return this._userRepository.getUsersByUsernameRange(usernames);
    }

    public getClients(predicate?: (client: Client) => boolean): Client[]
    {
        return this._userRepository.getClients(predicate);
    }

    public getUserWithClients(predicate?: (client: UserWithClients) => boolean): UserWithClients[]
    {
        return this._userRepository.getUserWithClients(predicate);
    }

    public registerUser(user: User): void
    {
        this._userRepository.registerUser(user);
    }

    public removeClient(user: UserWithClients, client: Client): ServiceResponse<UserWithClients>
    {
        if (!user.clients.includes(client))
        {
            return new ServiceResponse<UserWithClients>(false, user, "Client is not a user's client");
        } 

        let clientIndex = user.clients.indexOf(client);
        user.clients.splice(clientIndex, 1);

        let clientUsernameIndex = user.clientsUsernames.indexOf(client.username);
        user.clientsUsernames.splice(clientUsernameIndex, 1);

        let userUsernameIndex = client.clientOf.indexOf(user.username);
        client.clientOf.splice(userUsernameIndex,1);

        this._userRepository.saveUser(user);

        return new ServiceResponse<UserWithClients>(true, user, "Client '"+client.fullName+"' removed");
    }
    

    public addClient(user: UserWithClients, client: Client): ServiceResponse<UserWithClients>
    {
        
        if (user.clientsUsernames.includes(client.username))
        {
            return new ServiceResponse<UserWithClients>(false, user, "Client already on list");
        }

        this.registerUser(client);

        user.clientsUsernames.push(client.username);
        user.clients.push(client);

        client.clientOf.push(user.username);

        let userSaved = this._userRepository.saveUser(user);
        if (!userSaved) return new ServiceResponse<UserWithClients>(false, userSaved, "Error updating user");
        
        return new ServiceResponse(true, user, "Client '" + client.fullName + "' created!");
    }

    public updateUser<TUser extends User | User>(user: TUser, newUser: TUser)  : ServiceResponse<TUser>
    {
        if (user.username !== newUser.username){
            console.log("Usernames: ",user.username, newUser.username)
            return new ServiceResponse<TUser>(false, user, "Users must have the same username");
        } 

        user.cpf = newUser.cpf;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.rg = newUser.rg;
        user.password = newUser.password;
        

        let userSaved = this._userRepository.saveUser(user) as TUser;

        if (!userSaved) return new ServiceResponse<TUser>(false, userSaved, "Error updating user");

        return new ServiceResponse(true, userSaved, "User '"+user.username+"' successfully updated");
    }
}
