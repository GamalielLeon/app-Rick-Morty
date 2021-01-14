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
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { PopUpEpisodeComponent } from './components/pop-up-episode/pop-up-episode.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PagerComponent,
    CardComponent,
    CharacterDetailComponent,
    FavCharactersListComponent,
    CharactersListComponent,
    HomeComponent,
    LoaderComponent,
    PopUpEpisodeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
