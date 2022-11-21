import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideIconComponent } from './hide-show.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HideIconComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    HideIconComponent
  ]
})
export class HideShowIconModule { }
