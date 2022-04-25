import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { UserWithClients } from 'src/app/shared/models/user-with-clients';
import { AppConstants } from '../../shared/appConstants';
import { UserCredentials } from '../../shared/models/userCredentials';
import { AuthService } from '../../shared/services/auth.service';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{

    public form!: FormGroup;
    public variavel!: number;

    get userName() { return this.form.get('userName') };
    get password() { return this.form.get('password') };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private routes: Router,
        private customValidators: CustomValidators,
        private snackBar: MatSnackBar)
    { }

    ngOnInit(): void
    {
        this.form = this.formBuilder.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(AppConstants.USER_PASSWORD_MIN_LENGTH)]]
        });
    }

    handleSubmit(): void
    {
        if (this.form.invalid)
        {
            this.snackBar.open("Invalid data", '', {
                duration:1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });
            return;
        }
        let _userName = this.form.get('userName')?.value;
        let _password = this.form.get('password')?.value;

        let credentials = new UserCredentials(_userName, _password);

        let authResponse = this.authService.authenticateUser(credentials);
        if (!authResponse.success)
        {
            this.snackBar.open(authResponse.message, '', {
                duration:1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }

        this.snackBar.open(authResponse.message, '', {
            duration:1000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });

        let user = authResponse.data;

        if (user instanceof UserWithClients){
            this.routes.navigate(["/"]);
        }
        
        if (user instanceof Client){
            this.routes.navigate(["/client-area"]);
        }

    }

}
