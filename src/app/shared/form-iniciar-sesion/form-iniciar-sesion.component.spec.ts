import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIniciarSesionComponent } from './form-iniciar-sesion.component';

describe('FormIniciarSesionComponent', () => {
  let component: FormIniciarSesionComponent;
  let fixture: ComponentFixture<FormIniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIniciarSesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
