import { Injectable, OnInit } from "@angular/core";
import { Client } from "../models/client";
import { User } from "../models/user";
import { UserWithClients } from "../models/user-with-clients";
import { UsersMock } from "../mocks/usersMock";

@Injectable({ providedIn: 'root' })

// class used to simulate the backend
export class UserRepository
{
    private registeredUsers!: Map<string, User>;
    private usersWithClients!: Map<string, UserWithClients>;
    private clients!: Map<string, Client>;


    constructor()
    {        
        this.usersWithClients = new Map<string, UserWithClients>(); // [username, user]
        this.clients = new Map<string, Client>(); // [username, user]
        this.registeredUsers = new Map<string, User>(); // [username, user]

        UsersMock.users.forEach(u =>
        {
            this.usersWithClients.set(u.username, u);
            this.registeredUsers.set(u.username, u);
        });

        UsersMock.clients.forEach(c => 
        {
            this.clients.set(c.username, c);
            this.registeredUsers.set(c.username, c)
        });
    }

    public totalUsers = () => this.registeredUsers.size;

    public getClients(predicate?: (user: Client) => boolean): Client[]
    {
        let result = [...this.clients.values()];

        return predicate ? result.filter(predicate) : result;
    }

    public getUserWithClients(predicate?: (user: UserWithClients) => boolean): UserWithClients[]
    {
        let result = [...this.usersWithClients.values()];

        return predicate ? result.filter(predicate) : result;
    }


    public getUsers(predicate?: (user: User) => boolean): User[]
    {
        let result = [...this.registeredUsers.values()];

        return predicate ? result.filter(predicate) : result;
    }


    public registerUser(user: User): void
    {
        if (this.registeredUsers.has(user.username)) return;
        
        if (user instanceof UserWithClients)
        {
            this.usersWithClients.set(user.username, user);
        }

        if (user instanceof Client)
        {
            this.clients.set(user.username, user);
        }

        this.registeredUsers.set(user.username, user);
    }

    public deleteUser(username: string): void
    {
        this.clients.delete(username);
        this.usersWithClients.delete(username);
        this.registeredUsers.delete(username);
    }

    public getUserByUsername(username: string): User | undefined
    {
        let user = this.registeredUsers.get(username);
        if (user instanceof UserWithClients)
        {
            this.setUserWithClientsClients(user);
        }

        return user;
    }

    public getUsersByUsernameRange(usernames?: string[], predicate?: (user?: User, username?: string) => boolean)
    {
        let _usernames = usernames ?? [...this.registeredUsers.keys()];
        let result: User[] = _usernames.map(username => this.registeredUsers.get(username)!)
        let _result = predicate ? result.filter(u => predicate(u, u.username)) : result;

        return predicate ? result.filter(u => predicate(u, u.username)) : result;
    }


    public getClientByUsername(username: string): Client | undefined
    {
        return this.clients.get(username);
    }


    public getUserWithClientsByUsername(username: string): UserWithClients | undefined
    {
        let user = this.usersWithClients.get(username);
        if (!user) return undefined;

        this.setUserWithClientsClients(user);

        return user;
    }

    public saveUser(user: User): User | undefined
    {
        if (!this.registeredUsers.has(user.username))
        {
            return undefined;
        }
        
        this.registeredUsers.set(user.username, user);

        if (user instanceof Client) 
        {
            this.clients.set(user.username, user);
        }

        if (user instanceof UserWithClients) 
        {
            this.usersWithClients.set(user.username, user);
        }        

        return user;
    }

    private setUserWithClientsClients(user: UserWithClients): void
    {
        let clients: Client[] = [];
        user.clientsUsernames.forEach(username => 
        {
            let c = this.clients.get(username);

            if (c)
            {
                clients.push(c);
            }
        });

        user.clients = clients;
    }
}