import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavCharactersListComponent } from './fav-characters-list.component';

const routes: Routes = [
  {path: '', component: FavCharactersListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavCharactersRoutingModule { }
