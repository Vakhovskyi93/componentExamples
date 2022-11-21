import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WeeksSelectorComponent } from './weeks-selector.component';
@NgModule({
  declarations: [WeeksSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    WeeksSelectorComponent
  ]
})
export class WeeksSelectorModule { }
