import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IBaseService<T> implements IBase<T> {
  url = environment.url;

  constructor(
    private http: HttpClient,
    @Inject(String) private endPoint = ''
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endPoint}`);
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${this.endPoint}/${id}`);
  }

  create(body: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endPoint}`, body);
  }
}

export interface IBase<T> {
  getAll(): Observable<T[]>;

  getOne(id: number): Observable<T>;

  create(body: T): Observable<T>;
}
