import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CHARACTER, CHARACTERS } from '../constants/paths';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

/* For using the children routes, it is necessary to use the <router-outlet> element
   inside the parent component that owns these children, otherwise the children will
   not be loaded and the default route will be applied. */
const routes: Routes = [
  {
    path: CHARACTERS,
    component: CharactersListComponent,
    children: [
      {path: `${CHARACTER}/:id`, component: CharacterDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
