import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { CalendarWeek } from '@mod/data/economic-calendar.model';
import { EasternTimeZoneName, MomentDateTimeFormats } from '@const';

@Component({
  selector: 'app-weeks-selector',
  templateUrl: './weeks-selector.component.html',
  styleUrls: ['./weeks-selector.component.scss']
})
export class WeeksSelectorComponent implements OnInit, OnDestroy {
  private defaultStringLength = 30;
  private subscriber = new Subscription();

  public selectorWidth = 295;
  public selectedIndex: number;
  public selectedWeek: CalendarWeek;
  public currentTime: string;

  @Input() weeksArray: CalendarWeek[];
  @Output() changeValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.selectedIndex = 0;
    this.selectedWeek = this.weeksArray[this.selectedIndex];
    const maxLength = Math.max(...this.weeksArray.map((i) => (i.weekName + i.weekValue).length));
    this.selectorWidth = maxLength > this.defaultStringLength ? this.selectorWidth + maxLength : this.selectorWidth;

    this.updateCurrentTime();
    const updateTimeInterval = interval(1000);
    this.subscriber.add(updateTimeInterval.subscribe(_ => this.updateCurrentTime()));
  }
  
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  submitNext() {
    this.selectedIndex += 1;
    this.changeValue.emit(this.weeksArray[this.selectedIndex]);
  }

  submitPrev() {
    this.selectedIndex -= 1;
    this.changeValue.emit(this.weeksArray[this.selectedIndex]);
  }

  valueChanged(event: MatSelectChange) {
    this.selectedIndex = this.weeksArray.findIndex((item, i) => item === event.value);
    this.changeValue.emit(this.weeksArray[this.selectedIndex]);
  }

  updateCurrentTime(): void {
    this.currentTime = moment().tz(EasternTimeZoneName).format(MomentDateTimeFormats.TimeAmPm);
  }
}