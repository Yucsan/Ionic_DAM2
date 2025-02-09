import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PokemonService } from '../providers/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: false
})
export class DetallesPage implements OnInit {

  pokemon: any;

  constructor(

    private dataService: PokemonService, 
    private navCtrl: NavController, 
    private activatedRoute: ActivatedRoute
  
  ) { 
 

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['pokemonData']) {
        this.pokemon = JSON.parse(params['pokemonData']); // Convertimos de JSON a objeto
      }
    });
    
  }

  ngOnInit() {

  
    console.log(this.pokemon)
  }

  volver(){
    this.navCtrl.navigateForward('/home');
  }


}
