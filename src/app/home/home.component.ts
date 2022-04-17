import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{

    constructor(private authService: AuthService) { }

    ngOnInit(): void
    {
    }

    handleClick()
    {
        let users = this.authService.registeredUsers;
        console.log("Logged: "+this.authService.isLogged() + "\n\n");
        
        users.forEach(u => console.log(u));
        
        
    }

}
