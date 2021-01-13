import { Component, OnInit } from '@angular/core';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { Router, ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { CHARACTER_API, EPISODE_API } from '../../constants/queries';
import { CharacterModel } from '../../models/character.model';
import { WAIT_LOAD } from 'src/app/constants/values';
import { CHARACTERS } from 'src/app/constants/paths';
import { FAV_CHARACTERS } from 'src/app/constants/localStorage';
import { EpisodeModel } from 'src/app/models/episode.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  private favorites: string[] = (localStorage.getItem(FAV_CHARACTERS) || '').split(',').filter(Boolean);
  private characterData: any|CharacterModel = {};
  private episodeSelected: any|EpisodeModel = {};
  private loading: boolean = true;
  statusIcon: any = { alive: 'fas fa-heartbeat fa-lg text-success',
                      dead: 'fas fa-dizzy fa-lg text-danger',
                      unknown: 'fas fa-question fa-lg' };

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => this.getCharacterById(params.id));
  }
  ngOnInit(): void { }
  /********** METHODS **********/
  private onCharacterReceived(character: CharacterModel): void {
    this.setCharacterData(character);
    this.setLoading(false);
  }
  private getCharacterById(id: number): void {
    this.rickMortyService.getItemFromAPI(CHARACTER_API, id).subscribe(
      character => this.onCharacterReceived(character as CharacterModel),
      error => this.setLoading(false) );
  }
  clickEpisode(episodeUrl: string): void {
    const episodeId: string = episodeUrl.split('/').slice(-1)[0];
    this.rickMortyService.getItemFromAPI(EPISODE_API, +episodeId).
      subscribe( episode => this.setEpisodeSelected(episode as EpisodeModel) );
  }
  addFavorite(): void{
    this.favorites.push(this.characterData.id.toString());
    localStorage.setItem(FAV_CHARACTERS, this.favorites.join(','));
  }
  isFavorite = (): boolean => this.favorites.includes(this.characterData.id.toString());
  goBack(): void { this.router.navigateByUrl(CHARACTERS); }
  /********** GETTERS **********/
  getEpisodeSelected = (): EpisodeModel => this.episodeSelected;
  getCharacterData = (): CharacterModel => this.characterData;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
  setCharacterData(character: CharacterModel): void { this.characterData = character; }
  setEpisodeSelected(episode: EpisodeModel): void { this.episodeSelected = episode; }
}
