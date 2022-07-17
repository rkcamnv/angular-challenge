import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories.service';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  defaultEditorExtensions,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';
import { IProduct } from '../../interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class ProductUpdateComponent implements OnInit {
  formProduct: FormGroup = null as any;
  isLoading = false;

  categories: ICategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProduct();
    this.getCategories();
  }

  private initForm() {
    this.formProduct = this.fb.group({
      id: [],
      title: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      images: [null, [Validators.required]],
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getProduct() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.productsService.getProduct(+id).subscribe((product) => {
          this.formProduct.patchValue({
            id: product.id,
            categoryId: product.category.id,
            title: product.title,
            description: product.description,
            images: product.images,
            price: product.price,
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.formProduct && this.formProduct.valid) {
      const product: IProduct = {
        ...this.formProduct.getRawValue(),
        images: this.formProduct.controls['images'].value.toString().split(','),
      };
      this.updateProduct(product);
    } else if (this.formProduct && this.formProduct.invalid) {
      Object.values(this.formProduct.controls).forEach((control) => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private updateProduct(product: IProduct) {
    this.isLoading = true;
    this.productsService.updateProduct(product).subscribe(
      () => {
        this.router.navigate(['/products']).then();
        this.alertService
          .open('', {
            label: 'Successfully!',
            status: TuiNotification.Success,
          })
          .subscribe();
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.alertService
          .open('', {
            label: error.message,
            status: TuiNotification.Error,
          })
          .subscribe();
      },
      () => (this.isLoading = false)
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
