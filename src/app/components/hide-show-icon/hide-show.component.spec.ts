import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HideIconComponent } from './hide-show.component';

describe('HideIconComponent', () => {
  let component: HideIconComponent;
  let fixture: ComponentFixture<HideIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HideIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HideIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
