import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../shared/models/client';
import { User } from '../shared/models/user';
import { UserWithClients } from '../shared/models/user-with-clients';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{

    get isLogged(): boolean 
    {
        return this._authService.isLogged();
    }

    get localUser(): User | undefined 
    {
        let user = this._authService.localUser;
        return this._authService.localUser;
    }

    get isClient(): boolean 
    {
        return this.localUser instanceof Client;
    }

    get isUserWithClients(): boolean 
    {
        return this.localUser instanceof UserWithClients
    }

    constructor(
        private _authService: AuthService,
        private _router: Router) 
    {
    }


    onLogout(): void
    {
        this._authService.logoutUser();
        this._router.navigate(["/login"]);
    }

    ngOnInit(): void
    {
        //this.isLogged = this._authService.isLogged();
    }
}
