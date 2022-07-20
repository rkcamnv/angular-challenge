import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from './categories/categories.component';
import {SharedModule} from "../../modules/shared/shared.module";
import {TuiButtonModule, TuiLinkModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {CategoryDetailComponent} from './category-detail/category-detail.component';
import {CategoryAddComponent} from './category-add/category-add.component';
import {FormsModule} from "@angular/forms";
import {TuiInputModule} from "@taiga-ui/kit";


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    SharedModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ]
})
export class CategoriesModule { }
