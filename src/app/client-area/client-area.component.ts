import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from '../shared/models/client';
import { UserUpdateModel } from '../shared/models/userUpdateModel';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserRepository } from '../shared/user-repository';

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.component.html',
  styleUrls: ['./client-area.component.css']
})
export class ClientAreaComponent implements OnInit {

  public form!: FormGroup;

  public client!: Client;
  get currentClient():Client{
      return this._authService.getCurrentUser() as Client;
  }

    constructor(private formBuilder: FormBuilder,
        private _authService: AuthService,
        private _userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar) 
    {
    }

    ngOnInit(): void
    {
        this.form = this.formBuilder.group({
            userName: [null],
            password: [null],
            firstName: [null],
            lastName: [null],
            cpf: [null],
            rg: [null]
        });

        this.client = this._authService.getCurrentUser() as Client ;
    }

    updateClient(clientUpdate: Client)
    {
        console.log("CLIENT UPDATE:", clientUpdate);
        console.log("CLIENT:",this.client);
        let currentClient = this._authService.getCurrentUser() as Client;
        console.log("CURRENT CLIENT:",currentClient);

        let response = this._userService.updateUser(currentClient, clientUpdate);
        console.log("RESPONSE:",response.data);


        if (!response.success)
        {            
            this.snackBar.open(response.message, '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }

        this.snackBar.open(response.message, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });


    }


    handleSubmit(): void
    {
        
    }

}
