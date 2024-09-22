import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { CharacterCreationComponent } from "./character-creation/character-creation.component";
import { GameComponent} from "./game/game.component";
import { TownComponent} from "./town/town.component";
import { DungeonComponent } from "./dungeon/dungeon.component";
import { ShopComponent } from "./shop/shop.component";


import { DungeonAccessGuard } from "./guards/dungeon-access.guard";
import {TownGuard} from "./guards/town-access.guard";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MainMenuComponent },
  { path: 'create-character', component: CharacterCreationComponent },
  { path: 'game', component: GameComponent },
  { path: 'town', component: TownComponent, canActivate: [TownGuard]  },
  { path: 'shop', component: ShopComponent, canActivate: [TownGuard]  },
  { path: 'dungeon', component: DungeonComponent, canActivate: [DungeonAccessGuard] },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    CharacterCreationComponent,
    GameComponent,
    TownComponent,
    DungeonComponent,
    ShopComponent
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
