import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUpdateModel } from '../shared/models/userUpdateModel';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit
{

    public form!: FormGroup;


    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) 
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
    }

    handleInputOnlyDigits(e: any): void
    {
        const pattern: RegExp = /[^\d]/g;

        let keyEvent = e as KeyboardEvent;
        let input: string = keyEvent.key;

        if (pattern.test(input))
        {
            e.preventDefault();
        }
    }

    handlePasteOnlyDigits(e: any): void
    {
        const pattern: RegExp = /[^\d]/g;
        let clipboardEvent = e as ClipboardEvent;
        let pasteData = clipboardEvent.clipboardData?.getData("text") ?? "";

        if (pattern.test(pasteData))
        {
            clipboardEvent.preventDefault();
            e.target.value += pasteData.replace(pattern, "");
        }
    }

    handleSubmit(): void
    {
        let _password = this.form.get('password')?.value;
        let _firstName = this.form.get('firstName')?.value;
        let _lastName = this.form.get('lastName')?.value;
        let _cpf = this.form.get('cpf')?.value;
        let _rg = this.form.get('rg')?.value;

        let userUpdate = new UserUpdateModel(_firstName, _lastName, _password, _cpf, _rg);

        // call userService 
        //   let registerResponse = this.authService.registerUser(userUpdate);

        // if (!registerResponse)
        {
            console.log("User not registered");
            return;
        }

        console.log("User successfully registered");

        this.router.navigate(["/"]);
    }

}
