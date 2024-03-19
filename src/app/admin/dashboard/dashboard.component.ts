import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeUser!: string
 

  constructor(
    private _adminService: AdminService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const admins = this._adminService.getAdmin()
    this._activatedRoute.params.subscribe(params => {
      this.activeUser = params['name']
    })
    
  }


}
