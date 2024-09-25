import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor - intercept called for URL:', request.url);

    const token = this.userService.getToken();
    console.log('AuthInterceptor - token:', token);

    // Define your API base URL
    const apiUrl = 'http://localhost:8080'; // Adjust if needed

    // Only add the Authorization header if the request is to your API
    if (request.url.startsWith(apiUrl)) {
      if (token) {
        // Clone the request and add the new header
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('AuthInterceptor - request modified with token');
        return next.handle(authReq);
      }
    }

    console.log('AuthInterceptor - no token added to request');
    return next.handle(request);
  }
}

