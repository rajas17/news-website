import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( ){}

  activeUser:any
  ngOnInit(): void {
    this.activeUser= localStorage.getItem('user')
    const temp = JSON.parse(this.activeUser)
    this.activeUser=temp
    
    
  }
}
