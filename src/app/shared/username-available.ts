import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "./services/auth.service";


@Injectable({providedIn: 'root'})

export class CustomValidators
{
    constructor(private authService: AuthService)
    {
    };

    public usernameAvailableValidator(): ValidatorFn
    {
        return (control: AbstractControl): ValidationErrors | null =>
        {
            const found = this.authService.isUsernameAvailable(control.value);

            return !found ? { usernameUnavailable: { value: control.value } } : null;
        };
    };
}