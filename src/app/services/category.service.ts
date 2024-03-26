import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient,) { }

  addCategory(categoryName: string, status: string): Observable<any> {
    return this._http.post(`${Environment.apiUrl}/api/Category/addCategory`, { categoryName, status });
  }

  getCategory() {
    return this._http.get(`${Environment.apiUrl}/api/Category/getAllCategories`)
  }

  updateCategory(categoryName: string, id: number): Observable<any> {
    const status:string='live'
    return this._http.put(`${Environment.apiUrl}/api/Category/editCategory/${id}`, {categoryName, status});
  }

  deleteCategory(id: number): Observable<any> {
    return this._http.delete(`${Environment.apiUrl}/api/Category/deleteCategory/${id}`)
  }

  getCategoryById(categoryId:any):Observable<any>{
    return this._http.get(`${Environment.apiUrl}/api/Category/getCategoryById/${categoryId}`)
  }

}
