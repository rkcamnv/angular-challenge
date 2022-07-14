import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiRootModule, TuiTextfieldControllerModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from '../components/header-bar/header-bar.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryDetailComponent } from '../components/category-detail/category-detail.component';
import { FormsModule } from '@angular/forms';
import { CategoryAddComponent } from '../components/category-add/category-add.component';
import {TuiInputModule} from "@taiga-ui/kit";
import {CategoryUpdateComponent} from "../components/category-update/category-update.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    SideBarComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryAddComponent,
    CategoryUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiLoaderModule,
    FormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
