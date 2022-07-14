import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../components/categories/categories.component';
import {ProductsComponent} from "../components/products/products.component";
import {EmployeesComponent} from "../components/employees/employees.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {CategoryDetailComponent} from "../components/category-detail/category-detail.component";
import {CategoryAddComponent} from "../components/category-add/category-add.component";
import {CategoryUpdateComponent} from "../components/category-update/category-update.component";

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
    path: 'users',
    component: EmployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
