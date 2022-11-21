import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedMoveComponent } from './expected-move.component';

describe('ExpectedMoveComponent', () => {
  let component: ExpectedMoveComponent;
  let fixture: ComponentFixture<ExpectedMoveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpectedMoveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
