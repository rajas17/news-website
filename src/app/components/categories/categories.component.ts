import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoryService:CategoryService,
    private _postService:PostsService,
    private _actRoute:ActivatedRoute
  ){}

  postData!:any
  categoryId!:any
  latestPosts:any
  categoryArray!: any
    ngOnInit(): void {
      this._actRoute.params.subscribe(val=>{
        // console.log(val);
        this.categoryId= val['id']                
      })
      this._categoryService.getCategory().subscribe(val=>{
        this.categoryArray=val 
      })
      this._postService.getLatestPosts().subscribe(val=>{
        this.latestPosts=val as any[]
      })
    }


  }

