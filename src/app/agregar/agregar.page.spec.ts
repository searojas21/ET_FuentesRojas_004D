import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPage } from './agregar.page';

describe('AgregarPage', () => {
  let component: AgregarPage;
  let fixture: ComponentFixture<AgregarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
