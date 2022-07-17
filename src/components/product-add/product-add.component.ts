import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/product';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  defaultEditorExtensions,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class ProductAddComponent implements OnInit {
  formProduct: FormGroup = null as any;
  isLoading = false;

  categories: ICategory[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
  }

  private initForm() {
    this.formProduct = this.fb.group({
      title: ['A new product', [Validators.required]],
      price: [998, [Validators.required]],
      description: [
        "Andy's shoes are designed to keep in...",
        [Validators.required],
      ],
      categoryId: [1, [Validators.required]],
      images: ['https://placeimg.com/640/480/any', [Validators.required]],
    });
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.formProduct && this.formProduct.valid) {
      const product: IProduct = {
        ...this.formProduct.getRawValue(),
        images: [this.formProduct.controls['images'].value],
      };
      this.addProduct(product);
    } else if (this.formProduct && this.formProduct.invalid) {
      Object.values(this.formProduct.controls).forEach((control) => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private addProduct(product: IProduct) {
    this.isLoading = true;
    this.productsService.addProduct(product).subscribe(
      () => {
        this.router.navigate(['/products']).then();
        this.alertService.open('', {
          label: 'Successfully!',
          status: TuiNotification.Success,
        });
      },
      (error: HttpErrorResponse) => {
        this.alertService.open('', {
          label: error.message,
          status: TuiNotification.Error,
        });
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  @tuiPure
  stringify(
    items: readonly ICategory[]
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<number>) =>
      map.get($implicit) || '';
  }
}
