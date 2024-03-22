import { DatePipe, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { filter, interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('dateTimeSwitch', [
      state('date', style({
        opacity: 1
      })),
      state('time', style({
        opacity: 1
      })),
      transition('date => time', [
        animate('2s')
      ]),
      transition('time => date', [
        animate('2s')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private _adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router

  ) {
    setInterval(() => {
      this.toggleDisplayMode();
    }, 4000);
  }



  isMasterAdmin: boolean = false
  // desiredPage: boolean = true
  activeUserArray: any
  isLoggedIn: any
  displayMode: 'date' | 'time' = 'date';
  temp: any
  ngOnInit(): void {

    this.updateDateTime();
    interval(1000).subscribe(() => {
      this.updateDateTime()
    })


    this.activeUserArray = localStorage.getItem('user')
    this.temp = JSON.parse(this.activeUserArray)
    // console.log(this.temp.name);
    this.isLoggedIn = this._adminService.isLoggedIn

    if (this.isLoggedIn == true) {
      if (this.temp.role == true) {
        this.isMasterAdmin = true
      }
    }

    // this._router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   if (event.url === '/admin') {
    //     this.desiredPage == true
    //   }
    // })

  }

  currentDate!: string;
  currentTime!: string;
  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  }
  logout() {
    this._adminService.logout()
    this._adminService.loggedIn.next(false)

  }
  toggleDisplayMode() {
    this.displayMode = this.displayMode === 'date' ? 'time' : 'date';
    this.updateDateTime();
  }
}


