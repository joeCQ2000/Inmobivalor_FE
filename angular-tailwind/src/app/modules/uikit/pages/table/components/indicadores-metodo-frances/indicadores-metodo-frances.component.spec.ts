import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresFrancesComponent } from './indicadores-metodo-frances.component';

describe('MetodoFrancesComponent', () => {
  let component: IndicadoresFrancesComponent;
  let fixture: ComponentFixture<IndicadoresFrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadoresFrancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicadoresFrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
