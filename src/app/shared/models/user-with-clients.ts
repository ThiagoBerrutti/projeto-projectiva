import { UserService } from "../services/user.service";
import { UsersMock } from "../usersMock";
import { Client } from "./client";
import { User } from "./user";


export class UserWithClients implements User
{
    public username!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public cpf!: string;
    public rg!: string;

    public clientsUsernames!: string[];
    public clients!: Client[];

    get fullName(): string { return this.firstName + " " + this.lastName }


    constructor()
    {
        this.clients = [];
        this.clientsUsernames = [];
    }

    public static factory(username: string, password?: string,
        firstName?: string, lastName?: string,
        cpf?: string, rg?: string, clientsUsernames?: string[]): UserWithClients
    {
        let user = new UserWithClients()
        {
            user.username = username;
            user.password = password ?? "";
            user.firstName = firstName ?? "";
            user.lastName = lastName ?? "";
            user.cpf = cpf ?? "";
            user.rg = rg ?? "";
            user.clientsUsernames = clientsUsernames ?? [];
        };

        return user;
    }
}