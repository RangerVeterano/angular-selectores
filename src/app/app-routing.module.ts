import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'selector',
    loadChildren : () => import('./paises/paises.module').then( m => m.PaisesModule) //importacion del lazy load para las rutas hijas
  },
  {
    path: '**',
    redirectTo:'selector'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
