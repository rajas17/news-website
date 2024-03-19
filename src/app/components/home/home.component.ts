import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  postData!:any[]
  constructor(
    private _postService:PostsService
  ){}

ngOnInit(): void {
  this._postService.getLatestPosts().subscribe(val=>{
    this.postData=val as any[]
  })
}
}
