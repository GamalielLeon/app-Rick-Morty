import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CHARACTER } from 'src/app/constants/paths';
import { CharacterModel } from 'src/app/models/character.model';
import { CHARACTER_API, PAGE } from 'src/app/constants/queries';
import { CURRENT_PAGE, PAGE_SIZE } from 'src/app/constants/localStorage';
import { DEFAULT_PAGE, WAIT_LOAD,  DEFAULT_PAGE_SIZE } from 'src/app/constants/values';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  private charactersPerPage: CharacterModel[] = [];
  private characters: CharacterModel[] = [];
  private totalRecords: number = 1;
  private loading: boolean = true;

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI(); }
  /********** METHODS **********/
  private onCallAPIEnd(characters: CharacterModel[], totalRecords: number): void {
    this.characters = [...characters];
    const pageSize: number = +(localStorage.getItem(PAGE_SIZE) || DEFAULT_PAGE_SIZE);
    const page: number = +(localStorage.getItem(CURRENT_PAGE) || DEFAULT_PAGE);
    this.setCharactersPerPage(page, pageSize);
    this.setTotalRecords(totalRecords);
    this.subscriptions.unsubscribe();
    this.setLoading(false);
  }
  private getCharactersFromAllPages(totalRecords: number): void {
    const records = [...Array(totalRecords + 1).keys()].slice(1).join(',');
    const subscription = this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, records).subscribe(
      characters => this.onCallAPIEnd(characters as CharacterModel[], totalRecords),
      error => this.setLoading(false) );
    this.subscriptions.add(subscription);
  }
  private getCharactersFromAPI(): void {
    const subscription = this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=1`]).
      subscribe(data => this.getCharactersFromAllPages(data.info.count),
                error => this.setLoading(false));
    this.subscriptions.add(subscription);
  }
  onChangePage(pageInfo: number[]): void { this.setCharactersPerPage(pageInfo[0], pageInfo[1]); }
  onSelectCard(index: number): void { this.router.navigateByUrl(`${CHARACTER}/${index}`); }
  /********** GETTERS **********/
  getLoading = (): boolean => this.loading;
  getTotalRecords = (): number => this.totalRecords;
  getCharactersPerPage = (): CharacterModel[] => this.charactersPerPage;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
  setTotalRecords(totalRecords: number): void { this.totalRecords = totalRecords; }
  setCharactersPerPage(page: number, pageSize: number): void {
    this.charactersPerPage = this.characters.slice(pageSize * (page - 1), page * pageSize );
  }
}
