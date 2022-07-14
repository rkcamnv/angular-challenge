import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  getCategories = (): Observable<ICategory[]> =>
    this.http.get<ICategory[]>(`${this.url}/categories`);

  getCategory = (id: number): Observable<ICategory> =>
    this.http.get<ICategory>(`${this.url}/categories/${id}`);

  addCategory = (category: ICategory): Observable<ICategory> =>
    this.http.post<ICategory>(`${this.url}/categories`, category);

  updateCategory = (category: ICategory): Observable<ICategory> =>
    this.http.put<ICategory>(`${this.url}/categories/${category.id}`, category);
}
