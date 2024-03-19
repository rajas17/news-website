import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostsService } from 'src/app/services/posts.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder,
    private _postService: PostsService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _snackbar:SnackBarService,
    private _http:HttpClient

  ) {

    this._actRoute.queryParams.subscribe(params => {
      const postId = params['id'];
      this.updateId=postId
      if (postId) {
        this.loadPost(postId);
        
      }
    });

    this.postForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      permalink: new FormControl (  '',  Validators.required),
      subtitle: new FormControl('', [Validators.required, Validators.minLength(20)]),
      category: new FormControl('', Validators.required),
      content: new FormControl('', [Validators.required, Validators.minLength(50)]),
      authorName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      authorRole: new FormControl('', [Validators.required, Validators.minLength(5)]),
      img: new FormControl('')
    })
  }


  ngOnInit(): void {
    this._categoryService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res
      },
      error: (err) => {
        console.log(err);

      }
    })

    this.postForm.get('title')?.valueChanges.subscribe((value: string) => {
      this.postForm.get('permalink')?.setValue(this.onTitleChange(value));
    });
  }

  postForm!: FormGroup
  categories: Category[] = [];
  imgSrc: any = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC'
  selectedImg: any = ''
  formStatus:string='Add New'
  updateId:string=''


  loadPost(postId: string): void {
    this._postService.getSinglePost(postId).subscribe(post => {
      this.imgSrc = post.imgPath; // Set image URL
      this.postForm.patchValue({
        title: post.title,
        permalink: post.permalink,
        subtitle: post.subtitle,
        category: `${post.categoryId}-${post.category}`,
        content: post.content,
        authorName: post.authorName,
        authorRole: post.authorRole,
        img: '' 
      });
      this.formStatus='Edit'
    });
  }
  
  onTitleChange(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  onSubmit() {
    const split = this.postForm.value.category.split('-')
    
    console.log(this.postForm.value.permalink);
    

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      
      categoryId: split[0],
      categoryName: split[1],
    
      subtitle: this.postForm.value.subtitle,
      content: this.postForm.value.content,
      imgPath: this.selectedImg,
      authorName: this.postForm.value.authorName,
      authorRole: this.postForm.value.authorRole,
      views: 0,
      status: 'new',
      isFeatured: false,
      createdAt: new Date()
    }
    console.log(postData);
    if (this.postForm.valid && this.formStatus=='Add New') {
      this._postService.addPost(postData).subscribe({
        next: (res) => {
          console.log('Blog added');
          this.imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC'
          this.postForm.reset()
          this._router.navigateByUrl('/review')
          this._snackbar.success('Blog added successfully!')
        },
        error: (err) => {
          console.log(err);

        }
      })
    } else if(this.postForm.valid && this.formStatus=='Edit'){
      this._postService.updatePost(this.updateId,postData).subscribe(val=>{
        this._snackbar.success('Blog updated successfully')
        this.postForm.reset()
        this._router.navigateByUrl('/review')
      })
    }else{
      this._snackbar.error('Fill all the fields!')
    }

  }

  showPreview($event: any) {
    const file = $event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();

        let data=new FormData();
        data.append('file', file),
        data.append('upload_preset', 'mi28d8xs'),

        img.onload = () => {


          // this._http.post('https://api.cloudinary.com/v1_1/mi28d8xs/image/upload',data)
          //   .subscribe({
          //     next:(res:any)=>{
          //       this.imgSrc=res.url,
          //       this.selectedImg-res.url
                
          //     }
          //   })


            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the maximum width and height for the compressed image
            const maxWidth = 800;
            const maxHeight = 600;

            // Calculate the new width and height to maintain aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            // Resize the canvas to the new width and height
            canvas.width = width;
            canvas.height = height;

            // Draw the image onto the canvas
            ctx?.drawImage(img, 0, 0, width, height);

            // Get the Base64 string of the resized image
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed (0.7 represents 70% quality)

            // Store the Base64 string in imgSrc and selectedImg
            this.imgSrc = compressedBase64;
            this.selectedImg = compressedBase64;
        };

        // Set the image source to trigger the onload event
        img.src = reader.result as string;
        // img.src=reader.result as string
    };

    // reader.readAsDataURL(file);
    reader.readAsDataURL(file)
}

  markAsTouched(fieldName: string): void {
    this.postForm.get(fieldName)!.markAsTouched();
  }
}
