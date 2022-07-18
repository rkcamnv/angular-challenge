import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit,} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators,} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit';
import {ILoginParams} from '../../interfaces/login';
import {LoginService} from '../../services/login.service';
import {BehaviorSubject, catchError, finalize, of, Subject, switchMap, takeUntil, tap,} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        email: 'Email is Invalid!',
      },
    },
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = null as any;
  isLoading$ = new BehaviorSubject(false);
  observable$ = of('');
  subject$ = new Subject<ILoginParams>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subject$.complete();
    this.isLoading$.complete();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, this.requiredEmail()]],
      password: [null, [this.requiredPassword()]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.getRawValue());
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private login(body: ILoginParams) {
    this.observable$
      .pipe(
        takeUntil(this.subject$),
        tap(() => this.isLoading$.next(true)),
        switchMap(() =>
          this.loginService.login(body).pipe(
            tap(() => this.router.navigate(['/'])),
            finalize(() => this.isLoading$.next(false)),
            catchError((error: HttpErrorResponse) =>
              this.alertService.open('', {
                label: error.message,
                status: TuiNotification.Error,
              })
            )
          )
        )
      )
      .subscribe();
  }

  private requiredEmail(): (field: AbstractControl) => ValidationErrors | null {
    return (field: AbstractControl): ValidationErrors | null =>
      field.value
        ? null
        : { required: new TuiValidationError('Email is required!') };
  }

  private requiredPassword(): (
    field: AbstractControl
  ) => ValidationErrors | null {
    return (field: AbstractControl): ValidationErrors | null =>
      field.value
        ? null
        : { required: new TuiValidationError('Password is required!') };
  }
}
