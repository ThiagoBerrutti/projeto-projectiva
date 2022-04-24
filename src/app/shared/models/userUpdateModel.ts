export class UserUpdateModel
{
    constructor(firstName: string, lastName: string, password: string,
        cpf: string, rg: string) 
        { 
            this.password = password;
            this.cpf = cpf;
            this.firstName = firstName;
            this.lastName = lastName;
            this.rg = rg;
        }
    
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public cpf!: string;
    public rg!: string;
}