import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../Modelo/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private URL = "http://localhost:3000";

  private URL2 = "https://pokeapi.co/api/v2";

  private sharedData: any;

  constructor(public http: HttpClient) { }

// https://pokeapi.co/api/v2/pokemon/{nombre}

  getAllPokemons(start: number, end: number): Promise<Pokemon[]> {
    let promise = new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get(`${this.URL2}/pokemon?limit=${start}&offset=${end}`).toPromise()
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
        //console.log("Sprites del Pokémon:", data.sprites);

        // Retornamos un objeto con los detalles del Pokémon
        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((typeInfo: any) => typeInfo.type.name), // Extraemos los tipos del Pokémon
          url: data.url,
          imageUrl: data.sprites.front_default, // Imagen del Pokémon
          habilidades: data.abilities.map((habilidad: any) => habilidad.ability.name),
          frente: data.sprites.other.showdown.front_shiny,
          espalda: data.sprites.other.showdown.back_shiny
        };
      })
      .catch((error: Error) => {
        console.log("Error al obtener detalles del Pokémon:", error);
        return { id: 0, name: '', url: '', types: [], height: 0, weight: 0, imageUrl: '', habilidades: [], frente: '', espalda: '' }; // Retornamos un Pokémon vacío en caso de error
      });
  }


  // navegación con datos
  setData(data: any): void {
    this.sharedData = data;
  }


  getData(): any {
    return this.sharedData;
  }


buscarPokemonsPorNombre(name: string): Promise<Pokemon[]> {
  return new Promise<Pokemon[]>((resolve, reject) => {
    this.http.get(`${this.URL2}/pokemon/${name.toLowerCase()}`).toPromise()
      .then((data: any) => {
        let pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((typeInfo: any) => typeInfo.type.name),
          url: `${this.URL2}/pokemon/${data.id}`,
          imageUrl: data.sprites.front_default,
          habilidades: data.abilities.map((habilidad: any) => habilidad.ability.name),
          frente: data.sprites.other.showdown.front_shiny,
          espalda: data.sprites.other.showdown.back_shiny
        };
        resolve([pokemon]); // Devuelve el Pokémon dentro de un array
      })
      .catch((error: any) => {
        console.error("Error al buscar el Pokémon:", error);
        reject("No se encontró el Pokémon solicitado");
      });
  });
}

  //bulbasaur
  /*
  buscarPokemonsPorNombre(name: string,): Promise<Pokemon[]> {

    console.log(name)

    return new Promise<Pokemon[]>((resolve, reject) => {

      this.http.get(`${this.URL2}/pokemon/${name.toLowerCase()}`).toPromise()
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
              reject(error.message);
            });
        });
    });
  }
*/
  

}



