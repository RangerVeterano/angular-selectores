import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';



@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule, //Importante importar nuestras rutas al modulo
    ReactiveFormsModule, //Importamos los formularios reactivos
    
  ]
})
export class PaisesModule { }
