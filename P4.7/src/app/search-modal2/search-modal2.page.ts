import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal2',
  templateUrl: './search-modal2.page.html',
  styleUrls: ['./search-modal2.page.scss'],
  standalone: false
})
export class SearchModal2Page implements OnInit {

  nombre: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
 
 
  search() {
    this.modalCtrl.dismiss({
      nombre: this.nombre,
    });
 
  }


}
