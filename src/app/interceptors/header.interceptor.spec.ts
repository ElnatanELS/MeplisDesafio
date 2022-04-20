import { DataServiceService } from './../services/data-service.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController,
} from '@angular/common/http/testing';

import { HeaderInterceptor } from './header.interceptor';

describe('HeaderInterceptor', () => {
  let service: DataServiceService;
  let httpMock: HttpTestingController ;
  beforeEach(() =>  {
    TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [
      DataServiceService,
      HeaderInterceptor,
            {
        provide: HTTP_INTERCEPTORS,
        useClass: HeaderInterceptor,
        multi: true,
      },
      ]
  });
  service = TestBed.inject(DataServiceService);
  httpMock = TestBed.inject(HttpTestingController);

});

  it('should be created', () => {
    const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should be inserted in header', () => {
    service.get('public.company.com').subscribe( res => {

      expect(res).toBeTruthy();
    })


    const httpRequest = httpMock.expectOne('public.company.com');

  expect(httpRequest.request.headers.has('X-MEPL-Frontend')).toEqual(true);


  });
  it('should be no inserted in header', () => {
    service.get('company.com').subscribe( res => {

      expect(res).toBeTruthy();
    })


    const httpRequest = httpMock.expectOne('company.com');

  expect(httpRequest.request.headers.has('X-MEPL-Frontend')).toEqual(false);


  });
});
