import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.page.html',
  styleUrls: ['./modal3.page.scss'],
  standalone: false
})
export class Modal3Page implements OnInit {

nombre: string = '';
last_name: string = '';
city: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
 
 
  search() {
    this.modalCtrl.dismiss({
      nombre: this.nombre,
      last_name: this.last_name,
      city: this.city
    });
 
  }

}
