import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { CharacterModel } from 'src/app/models/character.model';
import { FAV_CHARACTERS } from '../../constants/localStorage';
import { CHARACTER_API } from '../../constants/queries';
import { WAIT_LOAD } from 'src/app/constants/values';
import { CHARACTERS } from 'src/app/constants/paths';

@Component({
  selector: 'app-fav-characters-list',
  templateUrl: './fav-characters-list.component.html',
  styleUrls: ['./fav-characters-list.component.css']
})
export class FavCharactersListComponent implements OnInit {
  private favoriteCharacters: CharacterModel[] = [];
  private toggleTableHeaderArrow: boolean = false;
  private favoriteIdToDelete: number = 0;
  private loading: boolean = true;

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI(); }

  /********** METHODS **********/
  private onCallAPIEnd(characters: CharacterModel[]): void {
    this.setFavoriteCharacters(characters.length ? characters : [characters as unknown as CharacterModel]);
    this.setLoading(false);
  }
  private getTableHeaders(indexTh: number): any {
    const ths = document.getElementsByTagName('th');
    for (let i = ths.length - 1; i >= 0; i--) { ths[i].removeAttribute('class'); }
    return ths[indexTh];
  }
  private sortOnePropByColumn(propToSort: string, sortDirection: number): void {
    this.favoriteCharacters.sort( (a: any, b: any) =>
      ( a[propToSort].toString().toLowerCase().charCodeAt(0)
        - b[propToSort].toString().toLowerCase().charCodeAt(0) ) * sortDirection
    );
  }
  private sortTwoPropsByColumn(prop1: string, prop2: string, sortDirection: number): void {
    this.favoriteCharacters.sort( (a: any, b: any) =>
      ( a[prop1][prop2].toString().toLowerCase().charCodeAt(0)
        - b[prop1][prop2].toString().toLowerCase().charCodeAt(0) ) * sortDirection
    );
  }
  private sortByColumn(propsToSort: string[], sortDirection: number): void {
    propsToSort.length === 1 ? this.sortOnePropByColumn(propsToSort[0], sortDirection) :
                              this.sortTwoPropsByColumn(propsToSort[0], propsToSort[1], sortDirection);
  }
  changeArrowTableHeader(prop: string[], indexTh: number): void {
    this.toggleTableHeaderArrow = !this.toggleTableHeaderArrow;
    const th = this.getTableHeaders(indexTh);
    if (this.toggleTableHeaderArrow) {
      th.setAttribute('class', 'arrow-up');
      this.sortByColumn(prop, 1);
    } else {
      th.setAttribute('class', 'arrow-down');
      this.sortByColumn(prop, -1);
    }
  }
  getCharactersFromAPI(): void {
    const favCharactersIds: string = localStorage.getItem(FAV_CHARACTERS) as string;
    this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, favCharactersIds).subscribe(
      characters => this.onCallAPIEnd(characters as CharacterModel[]),
      error => this.setLoading(false));
  }
  deleteFavorite(confirm: boolean): void {
    if (confirm) {
      const favoritesIds: string[] = (localStorage.getItem(FAV_CHARACTERS) || '').split(',').filter(Boolean);
      favoritesIds.splice(favoritesIds.indexOf(this.getFavoriteIdToDelete()), 1);
      localStorage.setItem(FAV_CHARACTERS, favoritesIds.join(','));
      favoritesIds.length ? this.getCharactersFromAPI() : this.router.navigateByUrl(CHARACTERS);
    }
  }
  goBack(): void { this.router.navigateByUrl(CHARACTERS); }
  /********** GETTERS **********/
  getLoading = (): boolean => this.loading;
  getFavoriteCharacters = (): CharacterModel[] => this.favoriteCharacters;
  getFavoriteIdToDelete = (): string => this.favoriteIdToDelete.toString();
  /********** SETTERS **********/
  setFavoriteIdToDelete(characterId: number): void { this.favoriteIdToDelete = characterId; }
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
  setFavoriteCharacters(characters: CharacterModel[]): void { this.favoriteCharacters = characters; }
}
