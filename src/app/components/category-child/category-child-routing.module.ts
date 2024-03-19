import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatChildComponent } from './cat-child/cat-child.component';
import { CardsComponent } from '../cards/cards.component';

const routes: Routes = [
  {
    path:'',
    component:CatChildComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryChildRoutingModule { }
