import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../interfaces/category';
import {IBaseService} from './-base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends IBaseService<ICategory> {
  constructor(http: HttpClient) {
    super(http, 'categories');
  }
}
