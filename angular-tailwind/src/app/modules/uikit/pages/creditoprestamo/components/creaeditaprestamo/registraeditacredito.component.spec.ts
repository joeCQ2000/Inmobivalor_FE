import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraeditaprestamoComponent } from './registraeditacredito.component';

describe('TableActionComponent', () => {
  let component: RegistraeditaprestamoComponent;
  let fixture: ComponentFixture<RegistraeditaprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistraeditaprestamoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistraeditaprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
