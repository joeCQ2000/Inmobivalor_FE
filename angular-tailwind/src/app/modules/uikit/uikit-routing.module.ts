import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { MetodoFrancesComponent } from './pages/table/components/metodo-frances/metodo-frances.component';
import { CreditoPrestamoComponent } from './pages/table/components/credito-prestamo/credito-prestamo.component';
import { CreditoPrestamoRegistrarComponent } from './pages/table/components/credito-prestamo-registrar/credito-prestamo-registrar.component';
import { TableUsuarioComponent } from './pages/usuario/table.usuario.component';
import { CronogramaFrancesComponent } from './pages/table/components/cronograma-metodo-frances/cronograma-metodo-frances.component';
import { IndicadoresFrancesComponent } from './pages/table/components/indicadores-metodo-frances/indicadores-metodo-frances.component';
import { TableClienteComponent } from './pages/cliente/table.cliente.component';
import { TablePrestamoComponent } from './pages/creditoprestamo/table.prestamo.component';
import { InmobiliariaComponent } from './pages/cronograma/components/inmobiliaria/inmobiliaria.component';
import { ListarinmobiliariaComponent } from './pages/cronograma/components/listarinmobiliaria/listarinmobiliaria.component';
import { RegistraeditausuarioComponent } from './pages/rol/components/registraeditausuario/registraeditausuario.component';
import { RegistraeditaclienteComponent } from './pages/cliente/components/registraeditacliente/registraeditacliente.component';
import { RegistraeditaprestamoComponent } from './pages/creditoprestamo/components/creaeditaprestamo/registraeditacredito.component';
import { MonedaComponent } from './pages/cronograma/components/moneda/moneda.component';
import { MonedaRegistrarComponent } from './pages/cronograma/components/moneda-registrar/moneda-registrar.component';
import { TasaInteresComponent } from './pages/cronograma/components/tasa-interes/tasa-interes.component';
import { TasaInteresRegistrarComponent } from './pages/cronograma/components/tasa-interes-registrar/tasa-interes-registrar.component';
import { EntidadFinancieraTableComponent } from './pages/table/components/entidad-financiera-table/entidad-financiera-table.component';
import { EntidadTasaTableComponent } from './pages/table/components/entidad-tasa-table/entidad-tasa-table.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [ 
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
      { path: 'moneda', component: MonedaComponent },
      { path: 'moneda-registrar', component: MonedaRegistrarComponent },
       { path: 'tasa-interes', component: TasaInteresComponent },
      { path: 'tasa-interes-registrar', component: TasaInteresRegistrarComponent },
       { path: 'usuario', component: TableUsuarioComponent },
       { path: 'cliente', component: TableClienteComponent },
       { path: 'creditoprestamo', component: TablePrestamoComponent },
      { path: 'entidad-financiera-table', component: EntidadFinancieraTableComponent },
      { path: 'entidad-tasa-table', component: EntidadTasaTableComponent },
      { path: 'metodo_frances', component: MetodoFrancesComponent },
      { path: 'inmobiliaria', component: InmobiliariaComponent },
      { path: 'Listarinmobiliaria', component: ListarinmobiliariaComponent },
      { path: 'registraeditausuario', component: RegistraeditausuarioComponent },
      { path: 'registraeditacliente', component: RegistraeditaclienteComponent },
       { path: 'registraeditacreditoprestamo', component: RegistraeditaprestamoComponent },
      { path: 'registraeditausuario/:id', component: RegistraeditausuarioComponent },
      { path: 'registraeditacliente', component: RegistraeditaclienteComponent },
       { path: 'cronograma', component: CronogramaFrancesComponent },
      { path: 'indicadores', component: IndicadoresFrancesComponent },
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
