import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  categoryArray: Category[] = [];

  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder,
    private _snackbar:SnackBarService

  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: new FormControl('', Validators.required)
    });

    this._categoryService.getCategory().subscribe({
      next: (res: any) => {
        console.log(res)
        this.categoryArray = res as Category[];
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
        this._categoryService.getCategory()
      }
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    const categoryData = form.get('category')!.value
    console.log(categoryData);

    if (form.valid) {
      this._categoryService.addCategory(categoryData, "live").subscribe(
        (res) => {
          // this.refreshCategory()
          console.log(res);
          
          this.ngOnInit();
          console.log('Added')
          this._snackbar.success('Category Added!')
          form.reset()
        },
        (err) => {
          console.log(err);
          console.log("error blovk");
        }
      )
    } else {
      this._snackbar.warning('Enter valid category')
    }
  }



  showEditModal: boolean = false;
  editedCategory: string = '';
  editedCategoryId!: number;


  editCategoryDialog(categoryName: string, id: number) {
    this.editedCategory = categoryName;
    this.showEditModal = true;
    this.editedCategoryId = id
    console.log(this.editedCategoryId);
    console.log(this.editedCategory);


  }

  saveEditedCategory() {

    this._categoryService.updateCategory(this.editedCategory, this.editedCategoryId).subscribe({
      next: (res) => {
        this._snackbar.success('Edited sucessfully!')
        this.refreshCategory()
      },
      error: (err) => {
        console.log(err);

      }
    })
    this.showEditModal = false;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  showDeleteModal: boolean = false;
  deleteId!: number;

  deleteDialog(id: number) {
    this.showDeleteModal = true
    this.deleteId = id
  }

  deleteCategory() {
    this._categoryService.deleteCategory(this.deleteId).pipe(tap(res => console.log(res))).subscribe({
      next: (res) => {
        this._snackbar.success('Deleted successfully')
        this.refreshCategory()
        console.log(res, "ajsdibsc");
        
      },
      error: (err) => {
        console.log(err);
        console.log("sjjdbuusd");
        

      }
    })
    this.showDeleteModal = false

  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
  refreshCategory() {
    this._categoryService.getCategory().subscribe({
      next: (res: any) => {
        console.log(res)
        this.categoryArray = res as Category[];
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
        this._categoryService.getCategory()
      }
    });
  }

  markAsTouched(fieldName: string): void {
    this.categoryForm.get(fieldName)!.markAsTouched();
  }

}
