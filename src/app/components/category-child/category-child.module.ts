import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryChildRoutingModule } from './category-child-routing.module';
import { CatChildComponent } from './cat-child/cat-child.component';


@NgModule({
  declarations: [
    CatChildComponent
  ],
  imports: [
    CommonModule,
    CategoryChildRoutingModule
  ]
})
export class CategoryChildModule { }
