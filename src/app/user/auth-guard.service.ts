import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor( private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }
    canLoad (route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }
    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
