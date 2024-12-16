import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosinscritosPage } from './eventosinscritos.page';

describe('EventosinscritosPage', () => {
  let component: EventosinscritosPage;
  let fixture: ComponentFixture<EventosinscritosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosinscritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
