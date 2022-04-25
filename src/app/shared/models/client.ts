import { User } from "./user";


export class Client implements User
{
    public username: string = "";
    public password: string = "";
    public firstName: string = "";
    public lastName: string = "";

    public cpf: string = "";
    public rg: string = "";
    public clientOf: string[] = [];

    get fullName(): string { return this.firstName + " " + this.lastName }

    constructor()
    {
    }

    public static factory(username: string, password?: string,
        firstName?: string, lastName?: string, cpf?: string, rg?: string, clientOf?: string[]): Client
    {
        let user = new Client();

        user.username = username;
        user.password = password ?? "";
        user.firstName = firstName ?? "";
        user.lastName = lastName ?? "";
        user.cpf = cpf ?? "";
        user.rg = rg ?? "";
        user.clientOf = clientOf ?? [];

        return user;
    }
}