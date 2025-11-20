import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { MetodoFrancesComponent } from './pages/table/components/metodo-frances/metodo-frances.component';
import { CreditoPrestamoComponent } from './pages/table/components/credito-prestamo/credito-prestamo.component';
import { CreditoPrestamoRegistrarComponent } from './pages/table/components/credito-prestamo-registrar/credito-prestamo-registrar.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
      { path: 'metodo_frances', component: MetodoFrancesComponent },
      { path: 'credito-prestamo', component: CreditoPrestamoComponent },
      { path: 'credito-prestamo-registrar', component: CreditoPrestamoRegistrarComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
