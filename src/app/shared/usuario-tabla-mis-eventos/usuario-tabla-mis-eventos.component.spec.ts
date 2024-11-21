import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTablaMisEventosComponent } from './usuario-tabla-mis-eventos.component';

describe('UsuarioTablaMisEventosComponent', () => {
  let component: UsuarioTablaMisEventosComponent;
  let fixture: ComponentFixture<UsuarioTablaMisEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioTablaMisEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioTablaMisEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
