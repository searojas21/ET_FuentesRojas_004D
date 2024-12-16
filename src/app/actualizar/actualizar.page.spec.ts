import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarPage } from './actualizar.page';

describe('ActualizarPage', () => {
  let component: ActualizarPage;
  let fixture: ComponentFixture<ActualizarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
