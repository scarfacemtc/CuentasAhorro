import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesCuentaComponent } from './transacciones-cuenta.component';

describe('TransaccionesCuentaComponent', () => {
  let component: TransaccionesCuentaComponent;
  let fixture: ComponentFixture<TransaccionesCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionesCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
