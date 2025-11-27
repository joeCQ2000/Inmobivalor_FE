import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { MetodoFrancesComponent } from './pages/table/components/metodo-frances/metodo-frances.component';
import { CreditoPrestamoComponent } from './pages/table/components/credito-prestamo/credito-prestamo.component';
import { CreditoPrestamoRegistrarComponent } from './pages/table/components/credito-prestamo-registrar/credito-prestamo-registrar.component';
import { TableUsuarioComponent } from './pages/table copy/table.usuario.component';
import { RegistraeditausuarioComponent } from './pages/table copy/components/registraeditausuario/registraeditausuario.component';
import { CronogramaFrancesComponent } from './pages/table/components/cronograma-metodo-frances/cronograma-metodo-frances.component';
import { IndicadoresFrancesComponent } from './pages/table/components/indicadores-metodo-frances/indicadores-metodo-frances.component';
import { ListarClientesComponent } from './pages/table/components/listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
       { path: 'table copy', component: TableUsuarioComponent },
      { path: 'metodo_frances', component: MetodoFrancesComponent },
      { path: 'registraeditausuario', component: RegistraeditausuarioComponent },
       { path: 'cronograma', component: CronogramaFrancesComponent },
      { path: 'indicadores', component: IndicadoresFrancesComponent },
      { path: 'credito-prestamo', component: CreditoPrestamoComponent },
      { path: 'credito-prestamo-registrar', component: CreditoPrestamoRegistrarComponent },
      { path: 'listar-clientes', component: ListarClientesComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
