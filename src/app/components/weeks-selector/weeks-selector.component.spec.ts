import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeksSelectorComponent } from './weeks-selector.component';

describe('WeeksSelectorComponent', () => {
  let component: WeeksSelectorComponent;
  let fixture: ComponentFixture<WeeksSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeeksSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
