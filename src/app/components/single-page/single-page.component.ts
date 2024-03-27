import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css'],
})
export class SinglePageComponent implements OnInit {

  constructor(private _postService: PostsService) { }

  postsArray!: any
  isLoading: boolean = false
  ngOnInit(): void {
    this.isLoading = true
    this._postService.getPostsbyViews().pipe(finalize(() => this.isLoading = false)).subscribe(val => {
      this.postsArray = val
    })
  }
 
}