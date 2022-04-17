export class User 
{
    public userName!: string;
    public password!: string;
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public cpf!: string;
    public rg!: string;

    // constructor() { }
    // constructor(userName?: string, password?: string, id?: number, firstName?: string, lastName?: string, 
    //     cpf?: string, rg?: string) 
    //     { 
    //         this.userName = userName ?? "";
    //         this.password = password ?? "";
    //         this.id = id ?? 0;
    //         this.cpf = cpf ?? "";
    //         this.firstName = firstName ?? "";
    //         this.lastName = lastName ?? "";
    //         this.rg = rg ?? "";
    //     }

    public static factory(userName?: string, password?: string, id?: number,
        firstName?: string, lastName?: string, cpf?: string, rg?: string): User
    {
        let user = new User();

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