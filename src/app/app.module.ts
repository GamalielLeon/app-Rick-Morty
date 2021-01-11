import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagerComponent } from './components/pager/pager.component';
import { CardComponent } from './components/card/card.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { FavCharactersListComponent } from './pages/fav-characters-list/fav-characters-list.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailEpisodeComponent } from './components/detail-episode/detail-episode.component';

@NgModule({
  declarations: [
    AppComponent,
    PagerComponent,
    CardComponent,
    CharacterDetailComponent,
    FavCharactersListComponent,
    CharactersListComponent,
    HomeComponent,
    DetailEpisodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
