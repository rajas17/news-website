import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { SingleBlogCardComponent } from './components/single-blog-card/single-blog-card.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddPostComponent } from './admin/add-post/add-post.component';
import { AllPostsComponent } from './admin/all-posts/all-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { ErrorComponent } from './others/error/error.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './admin/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { layout: 'auth' }
  },
  {
    path: 'addpost',
    component: AddPostComponent,   
     canActivate: [authGuard]
  },
   {
    path: 'review',
    component: AllPostsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'addcategory',
    component: CategoryComponent,
    canActivate: [authGuard],
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'singleblog/:id',
    component: SingleBlogCardComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'single-page',
    component: SinglePageComponent
  },
  {
    path:'categories',
    component:CategoriesComponent,
  }, 
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'categories/:id',
    component:CategoriesComponent,
    loadChildren:() => import('src/app/components/category-child/category-child.module').then(m=>m.CategoryChildModule)
  },
  {
    path:'signup',
    component:SignupComponent,
    data : {layout : 'auth'},
    canActivate: [authGuard],
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
