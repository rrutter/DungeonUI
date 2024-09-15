import {ApplicationConfig, Injectable} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CustomOAuthLogger } from "./auth/auth.logger";
import { CustomDateTimeProvider } from "./auth/auth.datetime";
import {
  OAuthService,
  UrlHelperService,
  NullValidationHandler,
  OAuthLogger,
  DateTimeProvider,
  OAuthStorage
} from 'angular-oauth2-oidc';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    OAuthService,
    UrlHelperService,
    { provide: OAuthLogger, useClass: CustomOAuthLogger },
    { provide: NullValidationHandler, useClass: NullValidationHandler },
    { provide: DateTimeProvider, useClass: CustomDateTimeProvider },
    { provide: OAuthStorage, useValue: sessionStorage }
  ]
};
