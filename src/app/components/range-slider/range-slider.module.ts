import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { RangeSliderComponent } from './range-slider.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSliderModule,
  ],
  exports: [RangeSliderComponent],
  declarations: [RangeSliderComponent],
  providers: [],
})
export class RangeSliderModule { }
