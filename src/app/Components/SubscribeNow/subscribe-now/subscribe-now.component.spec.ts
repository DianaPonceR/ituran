import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeNowComponent } from './subscribe-now.component';

describe('SubscribeNowComponent', () => {
  let component: SubscribeNowComponent;
  let fixture: ComponentFixture<SubscribeNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
