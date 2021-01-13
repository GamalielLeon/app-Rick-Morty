import { Component, OnInit } from '@angular/core';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CHARACTER_API } from '../../constants/queries';
import { CharacterModel } from '../../models/character.model';
import { WAIT_LOAD } from 'src/app/constants/values';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  private characterData: any|CharacterModel = {};
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
  clickEpisode(episode: string): void {
    console.log(episode.split('/').slice(-1));
  }
  /********** GETTERS **********/
  getCharacterData = (): CharacterModel => this.characterData;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
  setCharacterData(character: CharacterModel): void { this.characterData = character; }
}
