import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistratePage } from './registrate.page';

describe('RegistratePage', () => {
  let component: RegistratePage;
  let fixture: ComponentFixture<RegistratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
