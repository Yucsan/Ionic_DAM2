import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchModal2Page } from './search-modal2.page';

const routes: Routes = [
  {
    path: '',
    component: SearchModal2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchModal2PageRoutingModule {}
