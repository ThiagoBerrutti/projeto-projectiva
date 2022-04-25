import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../shared/models/client';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

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
        let currentClient = this._authService.getCurrentUser() as Client;
        let response = this._userService.updateUser(currentClient, clientUpdate);

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

}
