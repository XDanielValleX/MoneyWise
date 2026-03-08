import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'transacciones',
        loadChildren: () => import('../transacciones/lista-transacciones/lista-transacciones.module').then(m => m.ListaTransaccionesPageModule)
      },
      {
        // Ruta para ver el detalle. El ":id" es para saber qué transacción abrir
        path: 'transacciones/detalle/:id',
        loadChildren: () => import('../transacciones/detalle-transaccion/detalle-transaccion.module').then(m => m.DetalleTransaccionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }