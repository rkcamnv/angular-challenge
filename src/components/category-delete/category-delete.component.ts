import {Component, Inject, OnInit} from '@angular/core';
import {TuiDialogContext, TuiDialogService,} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {ICategory} from '../../interfaces/category';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss'],
})
export class CategoryDeleteComponent implements OnInit {
  category: ICategory | null = null;
  isLoading = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<ICategory, ICategory>,

  ) {}

  ngOnInit(): void {}

  get categoryValue(): ICategory {
    return this.context.data;
  }

  closeDialog = () => this.context.completeWith(null as any);

  deleteCategory = () =>  this.context.completeWith(this.categoryValue);
}
