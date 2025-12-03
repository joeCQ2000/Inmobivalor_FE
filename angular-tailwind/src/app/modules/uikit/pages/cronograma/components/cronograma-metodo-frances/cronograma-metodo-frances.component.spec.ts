import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaFrancesComponent } from './cronograma-metodo-frances.component';

describe('MetodoFrancesComponent', () => {
  let component: CronogramaFrancesComponent;
  let fixture: ComponentFixture<CronogramaFrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronogramaFrancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronogramaFrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
