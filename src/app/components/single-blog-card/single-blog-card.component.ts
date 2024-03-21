import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-blog-card',
  templateUrl: './single-blog-card.component.html',
  styleUrls: ['./single-blog-card.component.css']
})
export class SingleBlogCardComponent implements OnInit {

  
  postData!: any
  latestPosts!: any[]
  postId!: any
  constructor(
    private postService: PostsService,
    private _actRoute: ActivatedRoute,
    private _renderer : Renderer2
  ) { }
  ngOnInit(): void {
    
    console.log();
    this._actRoute.params.subscribe(val => {
      this.postId = val['id']
      console.log(val);
      this._renderer.setProperty(window, 'scrollTo', { left: 0, top: 0, behavior: 'smooth' });
      
      this.postService.getSinglePost(this.postId).subscribe(val => {
        this.postData = val
        console.log(this.postData);

        this.postService.getByCategory(this.postData.categoryId).subscribe(val => {
          this.latestPosts = val as any[]
          console.log(this.postData.categoryId);

        })
      })
    })
   
}

}
