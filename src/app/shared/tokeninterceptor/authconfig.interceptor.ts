import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "../authsvc/auth.service";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor
{
    /**
     *
     */
    constructor(private authsvc: AuthService) {}

    intercept(interceptedRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authsvc.returnToken();

        interceptedRequest = interceptedRequest.clone({setHeaders: {Authorization : "Bearer " + token}});

        return next.handle(interceptedRequest);
    }
}