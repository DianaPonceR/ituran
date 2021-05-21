import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoFinalizadoComponent } from './proceso-finalizado.component';

describe('ProcesoFinalizadoComponent', () => {
  let component: ProcesoFinalizadoComponent;
  let fixture: ComponentFixture<ProcesoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoFinalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
