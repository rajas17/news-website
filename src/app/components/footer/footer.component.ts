import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  categoryArray:any
  constructor(
    private _categoryService:CategoryService
  ){
    this._categoryService.getCategory().subscribe(val=>{
      this.categoryArray= val as Category 
      console.log(this.categoryArray);
      
    })
  }

  
}
