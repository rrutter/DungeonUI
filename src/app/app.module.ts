import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },  // Define the login route
  { path: '**', redirectTo: 'login' }  // Wildcard route to redirect unknown routes to login
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent  // Declare the LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OAuthModule.forRoot()
  ],
  providers: [
    OAuthService,
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]  // Bootstrap the AppComponent
})
export class AppModule { }
