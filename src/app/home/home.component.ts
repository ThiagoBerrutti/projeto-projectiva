import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserRepository } from '../shared/repositories/user-repository';
import { Client } from '../shared/models/client';
import { UserWithClients } from '../shared/models/user-with-clients';
import { UserService } from '../shared/services/user.service';
import { UsersMock } from '../shared/mocks/usersMock';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit
{    
    get clients(){
        return UsersMock.clients;
    }

    get users(){
        return UsersMock.users;
    }
    

    constructor() 
    {
    }

    ngOnInit(): void
    {        
    }

    


}
