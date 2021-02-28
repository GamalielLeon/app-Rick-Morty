// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Components
import { PagerComponent } from './pager/pager.component';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';
import { PopUpEpisodeComponent } from './pop-up-episode/pop-up-episode.component';

@NgModule({
  declarations: [
    CardComponent,
    LoaderComponent,
    PopUpEpisodeComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    LoaderComponent,
    PopUpEpisodeComponent,
    PagerComponent
  ]
})
export class ComponentsModule { }
