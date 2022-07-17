import {Component, Inject, Injector, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../interfaces/product';
import {sortBy as _sortBy} from 'lodash';
import {TuiAlertService, TuiDialogService, TuiNotification,} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ProductDeleteComponent} from '../product-delete/product-delete.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  isLoading = false;
  isDeleteLoading = false;

  constructor(
    private productsService: ProductsService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productsService.getProducts().subscribe((products) => {
      this.products = _sortBy(products, ['title'], ['asc']);
      this.isLoading = false;
    });
  }

  deleteProduct(product: IProduct) {
    this.dialogService
      .open<IProduct>(
        new PolymorpheusComponent(ProductDeleteComponent, this.injector),
        {
          data: product,
          dismissible: false,
        }
      )
      .subscribe((result) => {
        if (result) {
          this.isDeleteLoading = true;
          this.productsService.deleteProduct(product.id).subscribe(
            () => {
              this.productsService.getProducts().subscribe((products) => {
                this.products = _sortBy(products, ['title'], ['asc']);
              });
              this.alertService
                .open('', {
                  label: 'Successfully!',
                  status: TuiNotification.Success,
                })
                .subscribe();
            },
            (error: HttpErrorResponse) => {
              this.isDeleteLoading = false;
              this.alertService
                .open('', {
                  label: error.message,
                  status: TuiNotification.Error,
                })
                .subscribe();
            },
            () => {
              this.isDeleteLoading = false;
            }
          );
        }
      });
  }
}
