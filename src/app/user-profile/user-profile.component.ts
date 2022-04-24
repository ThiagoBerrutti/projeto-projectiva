// import { Component, OnInit } from '@angular/core';
// import { LoginRepository } from '../shared/login-repository';
// import { Client } from '../shared/models/client';
// import { User } from '../shared/models/user';
// import { UserWithClients } from '../shared/models/user-with-clients';
// import { UserService } from '../shared/services/user.service';

// @Component({
//     selector: 'app-user-profile',
//     templateUrl: './user-profile.component.html',
//     styleUrls: ['./user-profile.component.css']
// })

// export class UserProfileComponent implements OnInit
// {
//     public user!: User | undefined;
//     public displayedColumns: string[] = ['name', 'cpf', 'rg'];
//     public client!: Client;

//     get asWithClients(): UserWithClients { return this.user as UserWithClients; }
//     get asClient(): Client { return this.user as Client }

//     constructor(private _userService: UserService, private _loginRepository: LoginRepository) 
//     { }

//     ngOnInit(): void 
//     {
//         this.user = this._loginRepository.getCurrentUser();
//     }

//     isUserWithClients(): boolean { return this.user instanceof UserWithClients }
//     isClient(): boolean { return this.user instanceof Client }

//     onClickRow(clickedClient:Client)
//     {
//         console.log("Clicked client: ",clickedClient);

//         this.client = clickedClient;
//     }

// }
