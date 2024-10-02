import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from './primeng.module';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPrimeNgModule
  ],
  exports: [
    CommonModule,
    SharedPrimeNgModule
  ],
  providers: [

  ]
})
export class SharedModule { }
