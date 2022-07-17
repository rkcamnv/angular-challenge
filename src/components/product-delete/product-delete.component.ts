import {Component, Inject, OnInit} from '@angular/core';
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {IProduct} from "../../interfaces/product";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<IProduct, IProduct>,
  ) { }

  ngOnInit(): void {
  }

  get productValue(): IProduct {
    return this.context.data;
  }

  closeDialog(product: IProduct = null as any){
    this.context.completeWith(product);
  }

  deleteProduct(){
    this.closeDialog(this.productValue);
  }
}
