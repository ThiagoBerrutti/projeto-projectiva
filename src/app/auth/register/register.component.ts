import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConstants } from '../../shared/appConstants';
import { UserCredentials } from '../../shared/models/userCredentials';
import { UserUpdateModel } from '../../shared/models/userUpdateModel';
import { AuthService } from '../../shared/services/auth.service';
import { CustomValidators } from '../../shared/username-available.directive';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit
{
    public form!: FormGroup;
    
    get userName() { return this.form.get('userName') };
    get password() { return this.form.get('password') };


    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private customValidators: CustomValidators) 
    {
    }


    ngOnInit(): void
    {
        this.form = this.formBuilder.group({
            userName: ["", [Validators.required, this.customValidators.usernameAvailableValidator()]],
            password: ["", [Validators.required, Validators.minLength(AppConstants.USER_PASSWORD_MIN_LENGTH)]]
        });        
    }


    handleSubmit(): void
    {
        if (this.form.invalid)
        {
            this.snackBar.open("Invalid data", '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        };

        let _userName = this.form.get('userName')?.value;
        let _password = this.form.get('password')?.value;

        let userRegistration = new UserCredentials(_userName, _password);

        let registerResponse = this.authService.registerUser(userRegistration);

        if (!registerResponse.success)
        {
            this.snackBar.open(registerResponse.message, 'Ok', {
                duration: 2000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });
            
            return;
        }

        this.snackBar.open(registerResponse.message, 'Ok', {
            duration: 2000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });

        this.router.navigate(["/"]);
    }

}
