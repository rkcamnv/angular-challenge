import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import {
  catchError,
  concatMap,
  finalize,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  @ViewChild('formCategory') formCategory!: NgForm;

  observable$ = of('');
  subject$ = new Subject();

  isLoading = false;

  constructor(
    private categoriesService: CategoriesService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subject$.complete();
  }

  onSubmit = () => {
    if (this.formCategory.valid) {
      this.addCategory(this.formCategory.value);
    } else {
      this.formCategory.controls['name'].markAllAsTouched();
      this.formCategory.controls['image'].markAllAsTouched();
    }
  };

  addCategory = (category: ICategory) => {
    this.observable$
      .pipe(
        take(1),
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          this.categoriesService.addCategory(category).pipe(
            tap(() => this.router.navigate(['/categories'])),
            finalize(() => (this.isLoading = false)),
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
              })
            )
          )
        )
      )
      .subscribe();
  };
}
