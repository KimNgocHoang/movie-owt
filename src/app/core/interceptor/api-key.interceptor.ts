import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  API_KEY = environment.apiKey;

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenizedReq = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.API_KEY}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
