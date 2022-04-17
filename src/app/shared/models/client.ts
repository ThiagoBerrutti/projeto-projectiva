import { User } from "./user";
import { UserWithClients } from "./user-with-clients";


export class Client implements User{
    public userName!: string;
    public password!: string;
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public cpf!: string;
    public rg!: string;
    public clientOf?: UserWithClients;

    public static factory(userName?: string, password?: string, id?: number,
        firstName?: string, lastName?: string, cpf?: string, rg?: string): Client
    {
        let user = new Client();

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