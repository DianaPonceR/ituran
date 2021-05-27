import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionBodyComponent } from './cotizacion-body.component';

describe('CotizacionBodyComponent', () => {
  let component: CotizacionBodyComponent;
  let fixture: ComponentFixture<CotizacionBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
