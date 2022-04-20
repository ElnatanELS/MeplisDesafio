import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  urls: String[] = ['public.company.com', 'cdn.company.com', 'live.company.com']

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.urls.includes(request.url)) {
      request = request.clone({
        setHeaders: {
          "X-MEPL-Frontend": "Test 2022"
        }
       });

    }

     console.log(request);


    return next.handle(request);
  }
}
