import { Injectable } from '@angular/core';
import { DateTimeProvider } from 'angular-oauth2-oidc';

@Injectable()
export class CustomDateTimeProvider implements DateTimeProvider {
  now(): number {
    return Date.now();  // Return the current timestamp in milliseconds
  }

  new(): Date {
    return new Date;
  }
}
