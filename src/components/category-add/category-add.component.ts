import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import {concatMap, finalize, map, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';

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
    this.formCategory.controls['name'].markAllAsTouched();
    this.formCategory.controls['image'].markAllAsTouched();

    if (this.formCategory.valid) {
      this.addCategory(this.formCategory.value);
    }
  };

  addCategory = (category: ICategory) => {
    this.observable$
      .pipe(
        takeUntil(this.subject$),
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          this.categoriesService.addCategory(category).pipe(
            tap(() => this.router.navigate(['/categories'])),
            finalize(() => (this.isLoading = false)),
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
