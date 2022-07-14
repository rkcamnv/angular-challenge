import { Component, Inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$ = new Observable<ICategory[]>();
  categoryDelete: ICategory = null as any;

  constructor(
    private categoriesService: CategoriesService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories = () =>
    (this.categories$ = this.categoriesService.getCategories());

  showDialogDelete = (
    content: PolymorpheusContent<TuiDialogContext>,
    category: ICategory
  ) => {
    this.categoryDelete = category;
    this.dialogService.open(content).subscribe();
  };
}
