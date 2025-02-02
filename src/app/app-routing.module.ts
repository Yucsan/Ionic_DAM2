import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pagina2',
    loadChildren: () => import('./pagina2/pagina2.module').then( m => m.Pagina2PageModule)
  },
  {
    path: 'search-modal',
    loadChildren: () => import('./search-modal/search-modal.module').then( m => m.SearchModalPageModule)
  },
  {
    path: 'search-modal2',
    loadChildren: () => import('./search-modal2/search-modal2.module').then( m => m.SearchModal2PageModule)
  },
  {
    path: 'modal3',
    loadChildren: () => import('./modal3/modal3.module').then( m => m.Modal3PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
