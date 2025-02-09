import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../providers/pokemon.service';
import { NavController } from '@ionic/angular';
import { Alumno } from '../Modelo/Alumno';
import { Pokemon } from '../Modelo/Pokemon';
import { NavigationExtras } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../search-modal/search-modal.page';

//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false

})
export class HomePage implements OnInit {

  public alumnos = new Array<Alumno>();

  //variables pokemon
  public pokemons = new Array<Pokemon>();

  //paginacion
  public currentPage = 1;
  public pageSize = 20;
  public total = 1294

  public poke?:any;

  constructor(private dataService: PokemonService, private navCtrl: NavController, private modalCtrl: ModalController ) { }


  ngOnInit(): void {
    this.loadPokemons();
  }


//-//----------------- DATA y compaginación ----------
  loadPokemons(): void {
    this.dataService.getAllPokemons((this.currentPage - 1) * 20, ((this.currentPage - 1) * 20) + this.pageSize)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons; // Sobrescribe en la primera página
        console.log(this.pokemons);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }


//----------------- PAGINACION ----------

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadPokemons();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  goToNextPage(): void {
    this.currentPage++;
    this.loadPokemons();
  }

  goToLastPage(): void {
    // el número de paginas es manual xq tiene muchas paginas en blanco
    //console.log(this.totalAlumnos.length);
    console.log(this.pageSize);
    this.currentPage = Math.ceil(this.total / this.pageSize);
    this.loadPokemons();
  }

  goToDetalles(id: number) {
    this.poke =  this.pokemons.find(pokemon => pokemon.id === id);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        pokemonData: JSON.stringify(this.poke)
      }
    };
 
    this.navCtrl.navigateForward('/detalles', navigationExtras);
  }




//----------------- MODAL ----------


async abrirModalBusqueda() {
  const modal = await this.modalCtrl.create({
    component: SearchModalPage,
  });

  await modal.present();

  // Recoge los datos al cerrar el modal
  const { data } = await modal.onDidDismiss();
  if (data) {
    const { name } = data;

    // Llama al servicio para buscar 
    this.buscarPokemon(name);

  }

}

// Llama al servicio para buscar pokemons
buscarPokemon(name: string) {

  this.dataService.buscarPokemonsPorNombre(name)
  .then((resultados) => {
      this.pokemons = resultados; // Almacena los resultados en la lista
      console.log('Resultados encontrados:', this.pokemons);
    })

    .catch((error) => {
      console.error('Error al buscar pokemons:', error);
    });

}






}
