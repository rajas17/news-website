import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  postsArray!: any[]

  constructor(
    private _postsService: PostsService,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this._postsService.getLatestPosts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.postsArray = res

      }
    })
  }

  // onFeatured(id: any, flag: boolean) {
  //   const data = {
  //     isFeatured: flag
  //   }
  //   this._postsService.markFeatured(id, data).subscribe(val => {
  //     alert('Updated')
  //   })
  // }

  delete(id: any) {
    // console.log(id);

    this._postsService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res, " sdfsadf");
        
        this.refreshCategory()
        this._snackbar.success('Deleted successfully!')
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  refreshCategory() {
    this._postsService.getPosts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.postsArray = res

      }
    })
  }
}
