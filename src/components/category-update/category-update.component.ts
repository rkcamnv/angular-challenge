import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import {
  catchError,
  concatMap,
  finalize,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { NgForm } from '@angular/forms';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss'],
})
export class CategoryUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('formCategory') formCategory!: NgForm;
  category$ = new Observable<ICategory>();
  categoryId = 0;
  isLoading = false;

  updateCategory$ = of('');
  subscription$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnDestroy() {
    this.subscription$.complete();
  }

  private getCategory = () =>
    (this.category$ = this.route.params.pipe(
      tap(({ id }) => (this.categoryId = +id)),
      switchMap(({ id }) => this.categoriesService.getCategory(+id))
    ));

  onSubmit = () => {
    this.formCategory.controls['name'].markAllAsTouched();
    this.formCategory.controls['image'].markAllAsTouched();

    if (this.formCategory.valid) {
      const category: ICategory = {
        ...this.formCategory.value,
        id: this.categoryId,
      };
      this.updateCategory(category);
    }
  };

  updateCategory = (category: ICategory) =>
    this.updateCategory$
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          this.categoriesService.updateCategory(category).pipe(
            tap(() => this.router.navigate(['/categories'])),
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
            finalize(() => (this.isLoading = false)),
          )
        )
      )
      .subscribe();
}
