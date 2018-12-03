import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
// import { PageNotFoundComponent } from './';

const routes: Routes = [
  { path: '', component: FotosComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'cargar', component: CargaComponent },
  { path: '**', component: FotosComponent },

  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class FeatureRoutingModule {}

export const APP_ROUTING = RouterModule.forRoot(routes);
