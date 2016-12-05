import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class PublicPageGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate() {
        if (this.authService.isSignedIn()) {
            this.router.navigate(['/home']);
        }
        return !this.authService.isSignedIn();
    }

}