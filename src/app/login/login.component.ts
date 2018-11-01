import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {  }

  login() {
    //Call the login method from AuthService and match credentials
    //If the credentials are correct, log user in and redirect
    this.auth.login(this.model.username, this.model.password)
    .subscribe(result => {
      if (result) {
        this.router.navigate(['tasklist']);
      } else {
        return false;
      }
    });
  }
}