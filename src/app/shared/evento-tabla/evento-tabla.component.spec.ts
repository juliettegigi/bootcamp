import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoTablaComponent } from './evento-tabla.component';

describe('EventoTablaComponent', () => {
  let component: EventoTablaComponent;
  let fixture: ComponentFixture<EventoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
