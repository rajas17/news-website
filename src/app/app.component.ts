import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'news-website';
  currentRouteData: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _adminService:AdminService) { }

  

ngOnInit(): void {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.currentRouteData = route.snapshot.data;
  });
}
// @HostListener('window:beforeunload', ['$event'])
//   beforeUnloadHandler(event:Event) {
//     if(this._adminService.loggedIn){
//     // Clear authentication data from local storage when the page is refreshed or navigated away
//     this._adminService.logout();}
//   }
}
