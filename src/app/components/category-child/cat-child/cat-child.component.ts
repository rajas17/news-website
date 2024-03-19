import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-cat-child',
  templateUrl: './cat-child.component.html',
  styleUrls: ['./cat-child.component.css']
})
export class CatChildComponent {

  constructor(
    private _categoryService: CategoryService,
    private _postService: PostsService,
    private _actRoute: ActivatedRoute
  ) {}

  postData: any;
  categoryId: any;

  ngOnInit(): void {
    this._actRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.loadPostsByCategory(this.categoryId);
    });
  }

  loadPostsByCategory(categoryId: any): void {
    this._postService.getByCategory(categoryId).subscribe(posts => {
      this.postData = posts;
    });
  }
}
