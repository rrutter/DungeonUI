import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { CharacterCreationComponent } from "./character-creation/character-creation.component";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MainMenuComponent },
  { path: 'create-character', component: CharacterCreationComponent },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    CharacterCreationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OAuthModule.forRoot(),
    FormsModule
  ],
  providers: [
    OAuthService,
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]  // Bootstrap the AppComponent
})
export class AppModule { }
