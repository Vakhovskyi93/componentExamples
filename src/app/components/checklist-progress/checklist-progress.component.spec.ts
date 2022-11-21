import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChecklistProgressComponent } from './checklist-progress.component';

describe('ChecklistProgressComponent', () => {
  let component: ChecklistProgressComponent;
  let fixture: ComponentFixture<ChecklistProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistProgressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
