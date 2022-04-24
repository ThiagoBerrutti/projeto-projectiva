import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserRepository } from '../shared/user-repository';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{

    public form!: FormGroup;

    get userName() { return this.form.get('username') }

    constructor(
        private _authService: AuthService, 
        private userRepository: UserRepository, 
        private formBuilder: FormBuilder,
        private router: Router) 
    {
    }

    ngOnInit(): void
    {
        this.form = this.formBuilder.group({
            username: [null]
        });

        if (!this._authService.isLogged())
        {
            this.router.navigate(["/login"]);
        }

        // console.log(this.form)
    }    

    handleClick()
    {
        // console.log(this.form)
    }
    
    show()
    {
        console.log(this.userRepository.getClients());
        console.log(this.userRepository.getUsers());
        
        
    }
    handleSubmit()
    {
        // let username = this.form.get('username')?.value || "";

        // let user = this.userRepository.getUserByUsername(username);
        // if (!user)
        // {
        //     console.log("User not found");
        //     return;
        // }
        // console.log("User found!");
        // console.log(user);
    }

}
