import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAsistenciaComponent } from './boton-asistencia.component';

describe('BotonAsistenciaComponent', () => {
  let component: BotonAsistenciaComponent;
  let fixture: ComponentFixture<BotonAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAsistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
