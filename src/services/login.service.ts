import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILoginParams, ILoginResult } from '../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = `${environment.url}/auth/login`;

  constructor(private http: HttpClient) {}

  login(body: ILoginParams): Observable<ILoginResult> {
    return this.http.post<ILoginResult>(this.url, body);
  }
}
