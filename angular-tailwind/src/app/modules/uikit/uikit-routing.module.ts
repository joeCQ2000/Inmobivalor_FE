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
import { ListarClientesComponent } from './pages/table/components/listar-clientes/listar-clientes.component';
import { MonedaComponent } from './pages/table/components/moneda/moneda.component';
import { MonedaRegistrarComponent } from './pages/table/components/moneda-registrar/moneda-registrar.component';
import { TasaInteresComponent } from './pages/table/components/tasa-interes/tasa-interes.component';
import { TasaInteresRegistrarComponent } from './pages/table/components/tasa-interes-registrar/tasa-interes-registrar.component';
import { RegistraeditausuarioComponent } from './pages/usuario/components/registraeditausuario/registraeditausuario.component';
import { TableClienteComponent } from './pages/cliente/table.cliente.component';
import { InmobiliariaComponent } from './pages/table/components/inmobiliaria/inmobiliaria.component';
import { ListarinmobiliariaComponent } from './pages/table/components/listarinmobiliaria/listarinmobiliaria.component';
import { RegistraeditaclienteComponent } from './pages/cliente/components/registraeditacliente/registraeditacliente.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
       { path: 'usuario', component: TableUsuarioComponent },
       { path: 'cliente', component: TableClienteComponent },
      { path: 'metodo_frances', component: MetodoFrancesComponent },
      { path: 'inmobiliaria', component: InmobiliariaComponent },
      { path: 'Listarinmobiliaria', component: ListarinmobiliariaComponent },
      { path: 'registraeditausuario', component: RegistraeditausuarioComponent },
      { path: 'registraeditacliente', component: RegistraeditaclienteComponent },
      { path: 'registraeditausuario/:id', component: RegistraeditausuarioComponent },
      { path: 'registraeditacliente/:id', component: RegistraeditaclienteComponent },
       { path: 'cronograma', component: CronogramaFrancesComponent },
      { path: 'indicadores', component: IndicadoresFrancesComponent },
      { path: 'credito-prestamo', component: CreditoPrestamoRegistrarComponent },
      { path: 'listar-clientes', component: ListarClientesComponent },
      { path: 'moneda', component: MonedaComponent },
      { path: 'moneda-registrar', component: MonedaRegistrarComponent },
      { path: 'tasa-interes', component: TasaInteresComponent },
      { path: 'tasa-interes-registrar', component: TasaInteresRegistrarComponent },
      
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
