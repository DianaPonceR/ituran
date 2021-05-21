import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPayComponent } from './how-to-pay.component';

describe('HowToPayComponent', () => {
  let component: HowToPayComponent;
  let fixture: ComponentFixture<HowToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
