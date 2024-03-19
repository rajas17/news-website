import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor( private router: Router, private _adminService:AdminService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._adminService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      alert("You don't have the authorization to access this page")
      return false;
      
    }
  }
}
