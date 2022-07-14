import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  category$ = new Observable<ICategory>();

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

 private getCategory = () =>
    (this.category$ = this.route.params.pipe(
      switchMap(({ id }) => this.categoriesService.getCategory(+id))
    ));
}
