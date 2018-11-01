import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard, AuthGuardService } from './guards/auth-guard.service';
import { AuthService } from './guards/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MessageService } from './message.service';

import { FormsModule }   from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "tasklist", component: TasklistComponent, canActivate: [AuthGuard] },
  /*Wildcard route: intercept and handle invalid URLs
   *Should be last route*/
  { path: "**", component: PageNotFoundComponent }, 
];

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailComponent,
    TasklistComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        //Returns the user's token from wherever it's being stored
        tokenGetter: jwtTokenGetter
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false } // Debugging purposes
    )
  ],
  providers: [AuthGuardService, AuthService, JwtHelperService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
