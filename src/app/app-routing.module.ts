import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../components/categories/categories.component';
import {ProductsComponent} from "../components/products/products.component";
import {EmployeesComponent} from "../components/employees/employees.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {CategoryDetailComponent} from "../components/category-detail/category-detail.component";
import {CategoryAddComponent} from "../components/category-add/category-add.component";
import {CategoryUpdateComponent} from "../components/category-update/category-update.component";
import {ProductDetailComponent} from "../components/product-detail/product-detail.component";
import {ProductUpdateComponent} from "../components/product-update/product-update.component";
import {ProductAddComponent} from "../components/product-add/product-add.component";
import {LoginComponent} from "../components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/detail/:id',
    component: CategoryDetailComponent,
  },
  {
    path: 'categories/update/:id',
    component: CategoryUpdateComponent,
  },
  {
    path: 'categories/add',
    component: CategoryAddComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'products/update/:id',
    component: ProductUpdateComponent,
  },
  {
    path: 'products/add',
    component: ProductAddComponent,
  },
  {
    path: 'users',
    component: EmployeesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
