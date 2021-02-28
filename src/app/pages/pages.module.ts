// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
// Components
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { FavCharactersListComponent } from './fav-characters-list/fav-characters-list.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    CharacterDetailComponent,
    FavCharactersListComponent,
    CharactersListComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    CharacterDetailComponent,
    FavCharactersListComponent,
    CharacterDetailComponent,
    HomeComponent
  ]
})
export class PagesModule { }
