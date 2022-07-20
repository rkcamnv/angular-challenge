import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../interfaces/category';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  finalize,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../services/-alert.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  @ViewChild('formCategory') formCategory!: NgForm;

  category$: Observable<ICategory> = null as any;
  isLoading$ = new BehaviorSubject(false);
  observable$ = of('');

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnDestroy() {
    this.isLoading$.complete();
  }

  onSubmit() {
    if (this.formCategory.valid) {
      this.createCategory(this.formCategory.value);
    }
  }

  private getCategory() {
    this.category$ = this.route.params.pipe(
      switchMap(({ id }) => {
        if (!id) return of(null as any);
        return this.categoriesService.getOne(+id);
      })
    );
  }

  private createCategory(category: ICategory) {
    this.observable$
      .pipe(
        take(1),
        tap(() => this.isLoading$.next(true)),
        switchMap(() =>
          this.categoriesService.create(category).pipe(
            tap(() => this.router.navigate(['/categories'])),
            finalize(() => this.isLoading$.next(false)),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.message)
            ),
            concatMap(() => this.alertService.success('Create successfully!'))
          )
        )
      )
      .subscribe();
  }
}
