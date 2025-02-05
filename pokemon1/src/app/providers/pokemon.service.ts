import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Alumno } from '../Modelo/Alumno';
import { Pokemon } from '../Modelo/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  private URL = "http://localhost:3000";

  private URL2 = "https://pokeapi.co/api/v2";

  constructor(public http: HttpClient) {

  }


  // Obtener todos los Pokémon
  getAllPokemons(): Promise<Pokemon[]> {
    let promise = new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get(this.URL2 + "/pokemon").toPromise()
        .then((data: any) => {
          let pokemons = new Array<Pokemon>();

          // obtenemos detalle x cada poke
          let pokemonRequests = data.results.map((itemPoke: any) => {
            return this.getPokemonDetalles(itemPoke.url); // Obtenemos detalles del Pokémon
          });

         
          Promise.all(pokemonRequests) // esperamos las promesas
            .then((pokemonDetails: Pokemon[]) => {
              
              pokemons = pokemonDetails;
              resolve(pokemons); 
            })
            .catch((error: Error) => {
              reject(error.message); // Si algo falla, rechazamos la promesa
            });
        })
        .catch((error: Error) => {
          reject(error.message); // Si falla la solicitud inicial, rechazamos la promesa
        });
    });
    return promise;
  }


  // Método para obtener detalles de un Pokémon a partir de su URL
  private getPokemonDetalles(url: string): Promise<Pokemon> {
    return this.http.get(url).toPromise()
      .then((data: any) => {
        // Retornamos un objeto con los detalles del Pokémon
        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((typeInfo: any) => typeInfo.type.name), // Extraemos los tipos del Pokémon
          url: data.url,
          imageUrl: data.sprites.front_default // Imagen del Pokémon
        };
      })
      .catch((error: Error) => {
        console.log("Error al obtener detalles del Pokémon:", error);
        return { id:0, name: '', url: '', types: [], height: 0, weight: 0, imageUrl: '' }; // Retornamos un Pokémon vacío en caso de error
      });
  }


  



  getAlumnos(): Promise<Alumno[]> {

    let promise = new Promise<Alumno[]>((resolve, reject) => {
      this.http.get(this.URL + "/alumnos").toPromise()
        .then((data: any) => {
          let alumnos = new Array<Alumno>();
          data.forEach((alumno: Alumno) => {
            //console.log(alumno);
            alumnos.push(alumno);
          });
          resolve(alumnos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;

  }//end_getAlumnos



}









