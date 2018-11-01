import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { MessageService } from '../message.service';

@Injectable()
export class AuthService {
    public token: string;
    private API_URL = environment.API_URL;
    //private APP_URL = "http://localhost/Portfolio/task-list/src/php/";
    
    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router, private messageService: MessageService) {
      var currentUser = JSON.parse(localStorage.getItem('token'));
      this.token = currentUser;
  }

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');

    //Check if the token is expired
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  register(data) {
    var userData = JSON.stringify(data);      
    
    return this.http.post(this.API_URL + "register.php", userData)
    .map((response: any) => {
      if (response.length > 0)
      {
        this.messageService.clear();
        //Add error messages from response to message service
        for (var i = 0; i < response.length; i++) {
          this.messageService.add(response[i])
        }
        return false;
      }
      else
      {
        this.messageService.clear();
        return true;
      }
    });
  }

  login(username, password) {
    var data = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(this.API_URL + "login.php", data)
    .map((response: any) =>  {
      if (response) {
        let token = response;
        if (token) {
          this.messageService.clear();
          //Add user id and username to token
          localStorage.setItem('token', JSON.stringify({user_id: response[0].user_id, username: username, token: token}));
          return true;
        }
      }
      else 
      {
        this.messageService.clear();
        this.messageService.add("Incorrect Username/Password");
      }
    }); 
  }

  logout() {
    //clear user logged in token to log out user
    localStorage.clear();
    this.token = null;
    this.router.navigate(['login']);
    this.messageService.clear();
    this.messageService.add("You have logged out");
  }
}
