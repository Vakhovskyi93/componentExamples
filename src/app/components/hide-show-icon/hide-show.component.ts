import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hide-icon',
  templateUrl: './hide-show.component.html',
  styleUrls: ['./hide-show.component.scss']
})
export class HideIconComponent {

  @Input() hideStatus: boolean;
  @Output() toggleView: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle(){
    this.hideStatus = !this.hideStatus;
    this.toggleView.emit(this.hideStatus)
  }
}
