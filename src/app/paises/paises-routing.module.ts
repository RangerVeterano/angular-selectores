import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

//Creamos las rutas hijas que queremos en nuestra aplicacion
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selector',
        component: SelectorPageComponent
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //importamos nuestras rutas como rutas hijas
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
