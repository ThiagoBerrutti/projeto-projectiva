import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRepository } from '../shared/repositories/login-repository';
import { Client } from '../shared/models/client';
import { User } from '../shared/models/user';
import { UserWithClients } from '../shared/models/user-with-clients';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-user-clients',
    templateUrl: './user-clients.component.html',
    styleUrls: ['./user-clients.component.css']
})

export class UserClientsComponent implements OnInit
{

    public form!: FormGroup;

    public user!: UserWithClients;
    public displayedColumns: string[] = ['name'];
    public selectedClient!: Client | null;
    public clientToAdd!: Client | null;

    public clientList!: Client[];

    public currentAction!: string;

    get allClients(): Client[] { return this._userService.getClients() }
    // get asWithClients(): UserWithClients { return this.user as UserWithClients; }
    // get asClient(): Client { return this.user as Client }

    constructor(
        private _userService: UserService,
        private _loginRepository: LoginRepository,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar)
    { }



    ngOnInit(): void
    {
        this.user = this._loginRepository.getCurrentUser() as UserWithClients;
        this.clientList = this.user.clients;
        this.form = this.formBuilder.group({
            name: [null],
            cpf: [null],
            rg: [null]
        });
        this.currentAction = '';
    }

    isUserWithClients(): boolean { return this.user instanceof UserWithClients }
    isClient(): boolean { return this.user instanceof Client }

    onClickRow(clickedClient: Client, event: MouseEvent)
    {
        this.currentAction = 'details'
        this.selectedClient = clickedClient;
    }

    onClickNewClientButton()
    {
        this.currentAction = 'new';
        this.selectedClient = null;
    }

    onClickAddClientButton()
    {
        this.currentAction = 'add';
        this.selectedClient = null;
        this.addClient(this.clientToAdd)
        this.clientToAdd = null;        
    }

    onClickUpdateClientButton()
    {
        this.currentAction = 'update';
    }

    onClickRemoveClientButton()
    {
        this.currentAction = 'remove';
        this.removeClient();
    }

    onSearchSubmit()
    {
        this.refreshSearch();
        this.selectedClient = null;
    }

    refreshSearch(){
        let _name: string = this.form.get('name')?.value ?? ""
        let _cpf: string = this.form.get('cpf')?.value ?? "";
        let _rg: string = this.form.get('rg')?.value ?? "";

        let result = this.user.clients.filter(c =>
            (!_name || c.fullName.toLocaleLowerCase().includes(_name.toLocaleLowerCase())) &&
            (!_cpf || c.cpf.includes(_cpf)) &&
            (!_rg || c.rg.includes(_rg))
        );

        this.clientList = result;

        if (!this.clientList.includes(this.selectedClient!))
        {
            this.selectedClient = null;
        }

        return true;
    }



    removeClient()
    {
        if (!this.selectedClient) return;

        let response = this._userService.removeClient(this.user, this.selectedClient);
        if (!response.success) 
        {
            this.snackBar.open(response.message, '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }

        this.user = response.data!;
        this.refreshSearch();

        this.snackBar.open(response.message, '', {
            duration: 1000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });
    }

    newClient(client: Client)
    {

        let response = this._userService.addClient(this.user, client);
        if (!response.success) 
        {
            this.snackBar.open(response.message, '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }


        this.user = response.data!;
        this.refreshSearch();

        this.snackBar.open(response.message, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });
    }


    updateClient(clientUpdate: Client)
    {
        if (!this.selectedClient) return;

        let response = this._userService.updateUser(this.selectedClient, clientUpdate);
        if (!response.success)
        {
            this.snackBar.open(response.message, '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }

        this.refreshSearch();

        this.snackBar.open(response.message, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });

        console.log(this.selectedClient)
    }



    addClient(client: Client | null)
    {
        if (!client) return;

        let response = this._userService.addClient(this.user, client);
        if (!response.success)
        {
            this.snackBar.open(response.message, '', {
                duration: 1000,
                verticalPosition: 'bottom',
                panelClass: 'error-snackbar'
            });

            return;
        }

        this.refreshSearch();

        this.snackBar.open("Client '"+response.data?.username+"' added", '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
        });
    }
}
