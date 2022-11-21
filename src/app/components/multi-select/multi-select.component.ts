import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControlG } from '@u/forms/form-generics';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MultiSelectDataItemModel } from './multi-select.model';


@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent<TValue> implements OnInit, OnDestroy {

  @Output() selected: EventEmitter<ReadonlyArray<TValue>> = new EventEmitter();
  @Input() title = 'Select';
  @Input() set data(val: ReadonlyArray<MultiSelectDataItemModel<TValue>>) {
    this._data = val;
    this.formControlG.setValue([],
      {
        emitEvent: false
      }
    );

  }
  @Input() formControlG: FormControlG<ReadonlyArray<TValue>> = new FormControlG<ReadonlyArray<TValue>>([]);
  @Input() set value(val: ReadonlyArray<TValue>) {
    this.formControlG.setValue(val, {
      emitEvent: false
    });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  get data(): ReadonlyArray<MultiSelectDataItemModel<TValue>> {
    return this._data;
  }

  private _data: ReadonlyArray<MultiSelectDataItemModel<TValue>> = [];
  private destroy$: Subject<boolean> = new Subject();
  constructor() { }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.formControlG.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.selected.emit(value);
    });
  }

  reset(): void {
    this.formControlG.setValue([]);
  }
}
