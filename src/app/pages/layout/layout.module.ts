import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {HeaderBarComponent} from "../../components/header-bar/header-bar.component";
import {SideBarComponent} from "../../components/side-bar/side-bar.component";


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderBarComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
