import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { PaisSmall, Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  //Declaracion de las variables, tiene que ser un grupo de controles
  miFormulario: FormGroup = this.fb.group(
    {
      //campo, valor por defecto, validadores sincronos, validadores asincronos
      region: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      frontera: ['', [Validators.required]]
    }
  )

  //llenar selectores
  regiones: string[] = []; //inicializado vacio
  paises: PaisSmall[] = []; //Arreglo para todos los paises por region
  // fronteras: string[] = []; //Arreglo para las fronteras
  fronteras: PaisSmall[] = [];

  //interfaz de usuario
  cargando: boolean = false;

  //Inyeccion de los servicios
  constructor(
    private fb: FormBuilder,
    private ps: PaisService
  ) { }

  ngOnInit(): void {
    // Cargamos todas las regiones
    this.regiones = this.ps.regiones;

    // Cuando cambie la region se busca el campo que queremos y nos vamos a ver los cambios del campo
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        //El (_) significa que no me interesa lo que venga de la funcion, es estandar
        tap((_) => {
          // antes de que se haga la peticion cogemos nuestro campo pais 
          // y lo reiniciamos con una cadena de texto vacia
          this.miFormulario.get('pais')?.reset('')

          //Marcamos que el formulario está cargando
          this.cargando = true;
        }),
        // colocamos el pipe para que la informacion que recogamos sea la lista de paises 
        // y no solo la region que es lo que se recoge del campo "region"
        switchMap(region => this.ps.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        //Aqui es que ya tenemos la data
        //Cargamos nuestros pasies en la variable local
        this.paises = paises

        //quitamos el cargando
        this.cargando = false;
      })

    //Misma operacion de arriba pero para conseguir los paises fronterizos de un pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          //Vaciamos la lista de las fronteras
          this.fronteras = []
          this.miFormulario.get('frontera')?.reset('')
          this.cargando = true;
        }),
        switchMap(codigo => this.ps.getPaisPorCodigo(codigo)),
        switchMap(pais => this.ps.getPaisesPorCodigos(pais?.borders!)),
      )
      .subscribe(paises => {
        //Cargamos nuestros pasies en la variable local
        //En el caso de que no tenga borders le ponemos un arreglo vacio
        this.fronteras = paises || []
        this.cargando = false;
      })
  }

  //Metodo para enviar el formulario
  guardar() {
    console.log(this.miFormulario.value);
  }

}
