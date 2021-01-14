import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Constants
import { OTHER, CHARACTERS, CHARACTER, HOME, FAVORITES } from './constants/paths';
// Components
import { FavCharactersListComponent } from './pages/fav-characters-list/fav-characters-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesGuard } from './guards/favorites-guard.guard';

const routes: Routes = [
  {path: HOME, component: HomeComponent},
  {path: CHARACTERS, component: CharactersListComponent},
  {path: FAVORITES, component: FavCharactersListComponent, canActivate: [FavoritesGuard]},
  {path: `${CHARACTER}/:id`, component: CharacterDetailComponent},
  {path: OTHER, pathMatch: 'full', redirectTo: HOME}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
