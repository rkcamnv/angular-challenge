import {ChangeDetectionStrategy, Component, Inject, Injector, OnInit} from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {catchError, concatMap, finalize, map, Observable, switchMap, take, tap} from 'rxjs';
import {ICategory} from '../../interfaces/category';
import {TuiAlertService, TuiDialogService, TuiNotification,} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {CategoryDeleteComponent} from '../category-delete/category-delete.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$ = new Observable<ICategory[]>();
  isDeleteLoading = false;

  constructor(
    private categoriesService: CategoriesService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories = () =>
    (this.categories$ = this.categoriesService.getCategories());

  showDialogDelete = (category: ICategory) => {
    this.dialogService
      .open<ICategory>(
        new PolymorpheusComponent(CategoryDeleteComponent, this.injector),
        {
          data: category,
          dismissible: false,
        }
      )
      .pipe(
        take(1),
        tap((category) => (category ? (this.isDeleteLoading = true) : false)),
        switchMap((category) =>
          this.categoriesService.deleteCategory(Number(category.id)).pipe(
            map(() => this.getCategories()),
            finalize(() => (this.isDeleteLoading = false)),
            catchError((error: HttpErrorResponse) =>
              this.alertService.open('', {
                label: error.message,
                status: TuiNotification.Error,
              })
            ),
            concatMap(() =>
              this.alertService.open('', {
                label: 'Successfully!',
                status: TuiNotification.Success,
                autoClose: false,
              })
            ),
          )
        )
      )
      .subscribe();
  };
}
