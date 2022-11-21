import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelType, Options, ChangeContext } from '@angular-slider/ngx-slider';
import { SliderRange } from './range-slider.modal';
@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})

export class RangeSliderComponent {
  @Input() value: number;
  @Input() highValue: number;
  @Output() valueChange = new EventEmitter<SliderRange>();

  options: Options = {
    floor: 0,
    ceil: 100,
    minRange: 5,
    pushRange: true,
    disabled: false,
    showOuterSelectionBars: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '%';
        case LabelType.High:
          return value + '%';
        default:
          return value + '%';
      }
    },
  };

  onUserChangeEnd(event: ChangeContext): void {
    this.value = event.value;
    this.highValue = event.highValue;
    this.valueChange.emit({ value: this.value, highValue: this.highValue });
  }
}
