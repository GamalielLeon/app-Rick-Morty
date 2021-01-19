import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WAIT_LOAD } from 'src/app/constants/values';
import { CHARACTERS } from 'src/app/constants/paths';
import { EpisodeModel } from 'src/app/models/episode.model';
import { CharacterModel } from '../../models/character.model';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { CHARACTER_API, EPISODE_API } from '../../constants/queries';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  private favorites: string[] = (sessionStorage.getItem(FAV_CHARACTERS) || '').split(',').filter(Boolean);
  private characterData: any|CharacterModel = {};
  private episodeSelected: any|EpisodeModel = {};
  private loading: boolean = true;
  statusIcon: any = { alive: 'fas fa-heartbeat fa-lg text-success',
                      dead: 'fas fa-dizzy fa-lg text-danger',
                      unknown: 'fas fa-question fa-lg' };

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router,
              private activeRoute: ActivatedRoute)
              { this.activeRoute.params.subscribe(params => this.getCharacterById(params.id)); }
  ngOnInit(): void { }
  /********** METHODS **********/
  async getCharacterById(id: number): Promise<void> { // Private
    this.characterData = await this.rickMortyService.getItemFromAPI(CHARACTER_API, id);
    this.setLoading(false);
  }
  async clickEpisode(episodeUrl: string): Promise<void> {
    const episodeId: string = episodeUrl.split('/').slice(-1)[0];
    this.episodeSelected = await this.rickMortyService.getItemFromAPI(EPISODE_API, +episodeId);
  }
  addFavorite(): void{
    this.favorites.push(this.characterData.id.toString());
    sessionStorage.setItem(FAV_CHARACTERS, this.favorites.join(','));
  }
  isFavorite = (): boolean => this.favorites.includes(this.characterData.id.toString());
  goBack(): void { this.router.navigateByUrl(CHARACTERS); }
  /********** GETTERS **********/
  getEpisodeSelected = (): EpisodeModel => this.episodeSelected;
  getCharacterData = (): CharacterModel => this.characterData;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
}
