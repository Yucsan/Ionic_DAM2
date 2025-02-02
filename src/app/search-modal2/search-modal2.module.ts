import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchModal2PageRoutingModule } from './search-modal2-routing.module';

import { SearchModal2Page } from './search-modal2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchModal2PageRoutingModule
  ],
  declarations: [SearchModal2Page]
})
export class SearchModal2PageModule {}
