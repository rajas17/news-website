import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  tokenKey!: string;
  loggedIn: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)

  constructor(private _http:HttpClient,private _router:Router) { }

  isLoggedIn!:boolean
  getAdmin():Observable<any>{
    return this._http.get(`${Environment.apiUrl}/admin`)
  }
  
  addAdmin(data:any):Observable<any>{
    return this._http.post(`${Environment.apiUrl}/api/Admin/addAdmin`,data)
  }

  loggedInTrue(){
    this.loggedIn.next(true)
    this.isLoggedIn=true
  }
  setToken(token: string): void {
    localStorage.setItem('user', JSON.stringify(token));
  }

  login(email:string, password:string):Observable<any>{
    return this._http.post(`${Environment.apiUrl}/api/Admin/login`,{email,password})
    
  }

  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
    this.loggedIn.next(false)
    this.isLoggedIn=false
  }
  

}
