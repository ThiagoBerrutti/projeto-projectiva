import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ClientAreaComponent } from './client-area/client-area.component';
import { UserClientsComponent } from './user-clients/user-clients.component';
import { AccessGuard } from './shared/access-guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,        
        data: { requiresLogin: true},
        canActivate: [AccessGuard],
    },
    {
        path: 'client-area',
        component: ClientAreaComponent,
        data: { requiresClient: true},
        canActivate: [AccessGuard],
    },
    {
        path: 'login',
        component: LoginComponent,        
        data: { requiresLogoff: true},
        canActivate: [AccessGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,        
        data: { requiresLogoff: true},
        canActivate: [AccessGuard]
    },
    {
        path: 'user-clients',
        component: UserClientsComponent,
        data: { requiresUserWithClients: true },
        canActivate: [AccessGuard],
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
