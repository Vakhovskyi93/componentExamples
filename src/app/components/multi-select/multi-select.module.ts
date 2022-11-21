import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MultiSelectComponent } from './multi-select.component';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, TooltipModule],
  exports: [MultiSelectComponent],
  declarations: [MultiSelectComponent],
  providers: [],
})
export class MultiSelectModule { }
