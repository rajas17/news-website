import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleBlogCardComponent } from './components/single-blog-card/single-blog-card.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoryComponent } from './admin/category/category.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './admin/add-post/add-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AllPostsComponent } from './admin/all-posts/all-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthmainComponent } from './auth/authmain/authmain.component';
import { ErrorComponent } from './others/error/error.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SafeHTMLPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CardsComponent,
    SinglePageComponent,
    ContactComponent,
    SingleBlogCardComponent,
    AboutComponent,
    DashboardComponent,
    CategoryComponent,
    AddPostComponent,
    AllPostsComponent,
    LoginComponent,
    AuthmainComponent,
    ErrorComponent,
    CategoriesComponent,
    CategoryCardComponent,
    SignupComponent,
    ProfileComponent,
    SafeHTMLPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
