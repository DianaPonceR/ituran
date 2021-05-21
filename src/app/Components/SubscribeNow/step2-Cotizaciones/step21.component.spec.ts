import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step21Component } from './step21.component';

describe('Step21Component', () => {
  let component: Step21Component;
  let fixture: ComponentFixture<Step21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step21Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
