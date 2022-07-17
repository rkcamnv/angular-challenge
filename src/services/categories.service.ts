import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = `${environment.url}/categories`;

  constructor(private http: HttpClient) {}

  getCategories = (): Observable<ICategory[]> =>
    this.http.get<ICategory[]>(this.url);

  getCategory = (id: number): Observable<ICategory> =>
    this.http.get<ICategory>(`${this.url}/${id}`);

  addCategory = (category: ICategory): Observable<ICategory> =>
    this.http.post<ICategory>(this.url, category);

  updateCategory = (category: ICategory): Observable<ICategory> =>
    this.http.put<ICategory>(`${this.url}/${category.id}`, category);

  deleteCategory = (id: number): Observable<any> =>
    this.http.delete<any>(`${this.url}/${id}`);
}
