import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { combineLatest, Observable, of } from 'rxjs';

import { PaisSmall, Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //
  private _baseUrl: string = 'https://restcountries.com/v2'

  //Declaracion de la variable de todas las regiones
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  //getter de las regiones
  get regiones(): string[] {
    //rompemos la referencia mandando un nuevo arreglo
    return [...this._regiones];
  }

  //Inyectamos el servicio para las peticiones
  constructor(
    private http: HttpClient
  ) { }

  // metodo para conseguir todos los paises por region
  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code,name`
    return this.http.get<PaisSmall[]>(url);
  }

  //metodo para conseguir un pais por medio de un codigo
  getPaisPorCodigo(codigo: string): Observable<Pais> | Observable<null> {

    //Si el codigo está vacio manda un observable de tipo null
    if (!codigo) {
      return of(null)
    }
    const url: string = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  //Metodo para conseguir un pais por codigo pero con menos informacion de la necesaria
  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {

    const url: string = `${this._baseUrl}/alpha/${codigo}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {

    //Si no hay bordes devolvemos un arreglo vacio
    if (!borders) {
      return of([])
    }

    //Esto es un arreglo de peticiones
    const peticiones: Observable<PaisSmall>[] = []

    borders.forEach((cod) => {
      //un observable solo se ejecuta cuando se sescribe
      const peticion = this.getPaisPorCodigoSmall(cod);
      peticiones.push(peticion)
    });

    //devuelve un observable que contiene un arreglo con el producto de las peticiones internas
    return combineLatest(peticiones);
  }
}
