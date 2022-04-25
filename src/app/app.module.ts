import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './auth/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomValidators } from './shared/custom-validators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ClientAreaComponent } from './client-area/client-area.component';
import { UserRepository } from './shared/repositories/user-repository';
import { UserService } from './shared/services/user.service';
import { LoginRepository } from './shared/repositories/login-repository';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { UserClientsComponent } from './user-clients/user-clients.component';
import { ClientEditComponent } from './client-edit/client-edit.component'
import { AccessGuard } from './shared/guards/access-guard';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        UserDetailsComponent,
        ClientAreaComponent,
        UserClientsComponent,
        ClientEditComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatCardModule,
        MatTableModule,
        MatRippleModule,
        MatListModule



    ],
    providers: [
        AuthService,
        UserService,
        CustomValidators,
        UserRepository,
        LoginRepository,
        AccessGuard

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
