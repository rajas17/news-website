import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this._http.post(`${Environment.apiUrl}/admin`, { email, password })
  }
}
