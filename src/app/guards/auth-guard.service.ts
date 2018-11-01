import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    //Check if the user has access to route
    //Redirect them to the login page if not
    if (localStorage.getItem('token')) {
      return true;    
    }
    this.router.navigate(['login']);
      return false;
  }
}
