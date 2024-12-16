import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarPerfilPage } from './mostrar-perfil.page';

describe('MostrarPerfilPage', () => {
  let component: MostrarPerfilPage;
  let fixture: ComponentFixture<MostrarPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
