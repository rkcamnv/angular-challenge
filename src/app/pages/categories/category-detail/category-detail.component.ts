import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { Observable, switchMap } from 'rxjs';
import { ICategory } from '../../../interfaces/category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  category$: Observable<ICategory> = null as any;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.category$ = this.route.params.pipe(
      switchMap(({ id }) => this.categoriesService.getOne(+id))
    );
  }
}
