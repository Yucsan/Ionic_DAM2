import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../providers/pokemon.service';

import { NavController } from '@ionic/angular';

import { Alumno } from '../Modelo/Alumno';

import { Pokemon } from '../Modelo/Pokemon';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false

})
export class HomePage implements OnInit {

  name?: String;

  public alumnos = new Array<Alumno>();

  //variables pokemon
  public pokemons = new Array<Pokemon>();

  constructor(private dataService: PokemonService, private navCtrl: NavController) { }


  ngOnInit(): void {

    this.dataService.getAllPokemons()
      .then((poke: Pokemon[]) => {
        this.pokemons = poke;
        console.log(this.pokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });

    this.dataService.getAlumnos()
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        //console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });








  }







}
