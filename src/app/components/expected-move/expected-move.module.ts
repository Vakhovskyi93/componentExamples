import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelModule } from '@c/common/label/label.module';
import { ExpectedMoveComponent } from './expected-move.component';
import { HideShowIconModule } from '../hide-show-icon/hide-show-icon.module';

@NgModule({
  declarations: [ExpectedMoveComponent],
  imports: [
    CommonModule,
    LabelModule,
    MatIconModule,
    HideShowIconModule
  ],
  exports: [ExpectedMoveComponent]
})
export class ExpectedMoveModule { }
