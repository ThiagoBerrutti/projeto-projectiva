import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../shared/models/client';
import { AuthService } from '../shared/services/auth.service';
import { CustomValidators } from '../shared/username-available';

@Component({
    selector: 'client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit
{

    public form!: FormGroup;

    @Input() public update!: boolean;
    @Input() public client!: Client | null;
    @Output() newClientEvent = new EventEmitter<Client>();

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) 
    {
    }

    ngOnInit(): void
    {
        this.form = this.formBuilder.group({
            firstName: [this.client?.firstName, Validators.required],
            lastName: [this.client?.lastName, Validators.required],
            cpf: [this.client?.cpf, Validators.required],
            rg: [this.client?.rg, Validators.required],
            password: ["12345"],
        });
    }



    createRandomData()
    {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const consonants = alphabet.filter(l => !vowels.includes(l));

        const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
        const randomWord = (minSize: number, maxSize: number) => 
        {
            let size = random(minSize, maxSize)
            let word = "";
            let isVowel = !!random(0, 1);
            for (let i = 0; i < size; i++)
            {

                word += isVowel ? vowels[random(0, vowels.length - 1)] : consonants[random(0, consonants.length - 1)];
                isVowel = !isVowel;
            }
            return word;
        };

        let _password = "12345";
        let _cpf = "";
        for (let i = 0; i < 11; i++)
        {
            _cpf += random(0, 9).toString();
        }

        let _rg = "";
        for (let i = 0; i < 10; i++)
        {
            _rg += random(0, 9).toString();
        }

        let _firstName = randomWord(5, 8);
        let _lastName = randomWord(3, 8);
        let _username = _firstName + _cpf;

        let randomClient = Client.factory(_username, _password, _firstName, _lastName, _cpf, _rg);

        this.form.setValue({
            cpf: _cpf,
            rg: _rg,
            firstName: _firstName,
            lastName: _lastName,
            password: _password
        });
    }

    handleSubmit(): void
    {
        if (!this.form.valid) return;

        let _password = this.form.get('password')?.value ?? "12345";
        let _firstName = this.form.get('firstName')?.value;
        let _lastName = this.form.get('lastName')?.value;
        let _cpf = this.form.get('cpf')?.value as string | undefined;

        let _username = this.update ? this.client?.username : _firstName + _cpf?.toString().slice(0, 3);
        console.log(this.update)
        console.log(this.client)
        console.log(this.update? 'true' : 'false')
        let _rg = this.form.get('rg')?.value;

        this.client = Client.factory(_username, _password, _firstName, _lastName, _cpf, _rg);

        this.newClientEvent.emit(this.client);
        // this.client = null;
    }
}
