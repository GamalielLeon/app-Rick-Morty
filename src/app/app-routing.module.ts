// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersRoutingModule } from './pages/characters-routing.module';
// Constants
import { OTHER, CHARACTER, HOME, FAVORITES } from './constants/paths';
// Components
import { HomeComponent } from './pages/home/home.component';
import { FavoritesGuard } from './guards/favorites-guard.guard';

const routes: Routes = [
  {path: HOME, component: HomeComponent},
  /* The "CharactersRoutingModule" is used to separate the characters routes, which is imported instead of
     declaring them inside this module. Uncomment the next line and remove the "CharactersRoutingModule"
     to use the route directly inside this file (the "app-routing.module"). */
  // {path: CHARACTERS, component: CharactersListComponent},

  /* The following two routes are loaded using lazy loading. Each page has its own routing module and general
     module in order to set its routes separately and thus allow them to load lazily. */
  {
    path: FAVORITES,
    canActivate: [FavoritesGuard],
    canLoad: [FavoritesGuard],
    loadChildren: () => import('./pages/fav-characters-list/fav-characters.module').then(m => m.FavCharactersModule)
  },
  {
    path: `${CHARACTER}/:id`,
    loadChildren: () => import('./pages/character-detail/character-detail.module').then(m => m.CharacterDetailModule)
  },
  {path: OTHER, pathMatch: 'full', redirectTo: HOME}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CharactersRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
