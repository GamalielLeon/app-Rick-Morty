import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CHARACTER } from 'src/app/constants/paths';
import { CHARACTER_API, PAGE } from 'src/app/constants/queries';
import { CharacterModel } from 'src/app/models/character.model';
import { CURRENT_PAGE, PAGE_SIZE } from '../../constants/localStorage';
import { DEFAULT_PAGE, WAIT_LOAD,  DEFAULT_PAGE_SIZE } from 'src/app/constants/values';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private charactersPerPage: CharacterModel[] = [];
  private characters: CharacterModel[] = [];
  private totalRecords: number = 1;
  private loading: boolean = true;

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI(); }
  ngOnDestroy(): void { }
  /********** METHODS **********/
  private onCallAPIEnd(totalRecords: number): void {
    const page: number = +(localStorage.getItem(CURRENT_PAGE) || DEFAULT_PAGE);
    const pageSize: number = +(localStorage.getItem(PAGE_SIZE) || DEFAULT_PAGE_SIZE);
    this.characters.sort( (a, b) => a.id - b.id );
    this.setCharactersPerPage(page, pageSize);
    this.setTotalRecords(totalRecords);
    this.setLoading(false);
  }
  private getCharactersFromAllPages(pages: number): void {
    let cont: number = 0;
    for (let p = 1; p <= pages; p++) {
      const subscription = this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=${p}`]).
      subscribe( data => {
        this.characters = [...this.characters, ...data.results];
        if (++cont === data.info.pages) { this.onCallAPIEnd(data.info.count); }
        subscription.unsubscribe();
      });
    }
  }
  private getCharactersFromAPI(): void {
    this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=${DEFAULT_PAGE_SIZE}`]).
      subscribe(data => this.getCharactersFromAllPages(data.info.pages),
                error => this.setLoading(false));
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
