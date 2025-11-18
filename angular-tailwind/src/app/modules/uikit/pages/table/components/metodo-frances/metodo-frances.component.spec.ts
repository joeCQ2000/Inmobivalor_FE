import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoFrancesComponent } from './metodo-frances.component';

describe('MetodoFrancesComponent', () => {
  let component: MetodoFrancesComponent;
  let fixture: ComponentFixture<MetodoFrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoFrancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoFrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
