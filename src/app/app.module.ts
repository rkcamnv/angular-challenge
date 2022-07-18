import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule, TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiRootModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderBarComponent} from '../components/header-bar/header-bar.component';
import {SideBarComponent} from '../components/side-bar/side-bar.component';
import {CategoriesComponent} from '../components/categories/categories.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryDetailComponent} from '../components/category-detail/category-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryAddComponent} from '../components/category-add/category-add.component';
import {
  TuiAvatarModule, TuiFieldErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule, TuiInputPasswordModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {CategoryUpdateComponent} from '../components/category-update/category-update.component';
import {ProductsComponent} from '../components/products/products.component';
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce';
import {CategoryDeleteComponent} from '../components/category-delete/category-delete.component';
import {ProductDetailComponent} from '../components/product-detail/product-detail.component';
import {ProductAddComponent} from '../components/product-add/product-add.component';
import {TuiAutoFocusModule, TuiLetModule} from "@taiga-ui/cdk";
import {TuiEditorModule} from "@taiga-ui/addon-editor";
import {ProductUpdateComponent} from "../components/product-update/product-update.component";
import {ProductDeleteComponent} from "../components/product-delete/product-delete.component";
import {LoginComponent} from "../components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    SideBarComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiCurrencyPipeModule,
    TuiAutoFocusModule,
    TuiInputNumberModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiLetModule,
    TuiAvatarModule,
    TuiEditorModule,
    TuiInputPasswordModule,
    TuiFieldErrorModule,
  ],
  entryComponents: [CategoryDeleteComponent, ProductDeleteComponent], // for stackblitz
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
