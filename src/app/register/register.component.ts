import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

  register() {
    //Pass all form data as parameter
    this.auth.register(this.model)
    .subscribe(result => {
      //If all data is correct, take user to login page
      if (result)
      {
        this.messageService.add("You have registered successfully. Please log in.");
        this.router.navigate(['login']);
      }
      else {
        return false;
      }
    });
  }

}
