import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingComponent} from "../../components/loading/loading.component";
import {TuiLoaderModule} from "@taiga-ui/core";



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    TuiLoaderModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule { }
