import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CategoriesService} from 'src/app/services/categories.service';
import {Observable} from 'rxjs';
import {ICategory} from '../../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<ICategory[]> = null as any;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoriesService.getAll();
  }
}
