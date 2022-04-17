import { Client } from "./client";
import { User } from "./user";


export class UserWithClients implements User
{
    public userName!: string;
    public password!: string;
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public cpf!: string;
    public rg!: string;

    public clients!: Client[];

    constructor(){
        this.clients = [];
    }

    public static factory(userName?: string, password?: string, id?: number,
        firstName?: string, lastName?: string, cpf?: string, rg?: string): UserWithClients
    {
        let user = new UserWithClients();

        user.userName = userName ?? "";
        user.password = password ?? "";
        user.id = id ?? 0;
        user.firstName = firstName ?? "";
        user.lastName = lastName ?? "";
        user.cpf = cpf ?? "";
        user.rg = rg ?? "";

        return user;
    }
}