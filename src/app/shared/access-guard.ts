import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterEvent, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Client } from "./models/client";
import { UserWithClients } from "./models/user-with-clients";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@Injectable({ providedIn: 'root' })

export class AccessGuard implements CanActivate
{
    constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const requiresLogin: boolean = route.data['requiresLogin'] || false;
        const requiresLogoff: boolean = route.data['requiresLogoff'] || false;
        const requiresClient: boolean = route.data['requiresClient'] || false;
        const requiresUserWithClients: boolean = route.data['requiresUserWithClients'] || false;

        let canActivateResult: boolean = true;
        
        if (requiresLogin) 
        {
            if (!this.authService.isLogged())
            {
                this.router.navigate(["/login"]);                
                return false;
            }            
        }

        if (requiresLogoff)
        {
            if (this.authService.isLogged())
            {
                this.router.navigate(["/"]);
                return false;            
            }
        }


        if (requiresClient)
        {
            let user = this.authService.getCurrentUser();
            canActivateResult = canActivateResult && (user instanceof Client);
        }

        if (requiresUserWithClients)
        {
            let user = this.authService.getCurrentUser();
            canActivateResult = canActivateResult && (user instanceof UserWithClients);
        }

        if (!canActivateResult)
        {
            this.router.navigate(["/"]);
        }

        return canActivateResult;
    }
}