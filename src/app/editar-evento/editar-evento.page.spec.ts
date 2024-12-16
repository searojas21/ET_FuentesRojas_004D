import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarEventoPage } from './editar-evento.page';

describe('EditarEventoPage', () => {
  let component: EditarEventoPage;
  let fixture: ComponentFixture<EditarEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
