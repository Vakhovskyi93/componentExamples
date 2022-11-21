import { Subscriber } from 'rxjs';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-checklist-progress',
  templateUrl: './checklist-progress.component.html',
  styleUrls: ['./checklist-progress.component.scss'],
})
export class ChecklistProgressComponent implements OnInit, OnDestroy, OnChanges {
  @Input() size: 'small' | 'large' = 'small';
  @Input() value = 0;
  @Input() tasksLength = 0;
  @Input() isFirstTimeOpening = false;

  @ViewChild('rightPart', { read: ElementRef }) public rightPart;
  @ViewChild('backAdditionalPart', { read: ElementRef }) public backAdditionalPart;
  @ViewChild('leftPart', { read: ElementRef }) public leftPart;

  public percentProgress = 0;

  private subscriber = new Subscriber();

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    setTimeout(() => this.drawProgress(this.value), 0);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  private drawProgress(percent: number): void {
    this.percentProgress = ((360 / 100) * percent);
  }
}
