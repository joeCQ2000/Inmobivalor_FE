import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarinmobiliariaComponent } from './listarinmobiliaria.component';

describe('ListarinmobiliariaComponent', () => {
  let component: ListarinmobiliariaComponent;
  let fixture: ComponentFixture<ListarinmobiliariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarinmobiliariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarinmobiliariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
