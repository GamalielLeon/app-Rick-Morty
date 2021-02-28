import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CHARACTER } from 'src/app/constants/paths';
import { CharacterModel } from 'src/app/models/character.model';
import { CHARACTER_API, PAGE } from 'src/app/constants/queries';
import { CURRENT_PAGE, PAGE_SIZE } from 'src/app/constants/sesionStorage';
import { DEFAULT_PAGE,  DEFAULT_PAGE_SIZE } from 'src/app/constants/values';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  private charactersPerPage: CharacterModel[] = [];
  private totalRecords: number = 1;
  private loading: boolean = true;

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI().catch(error => this.setLoading(false)); }
  /********** METHODS **********/
  async getCharactersFromAPI(): Promise<void> { // Private
    this.setLoading(true);
    ({info: {count: this.totalRecords}} = await this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=1`]));
    const pageSize: number = +(sessionStorage.getItem(PAGE_SIZE) || DEFAULT_PAGE_SIZE);
    const page: number = +(sessionStorage.getItem(CURRENT_PAGE) || DEFAULT_PAGE);
    const idStart: number = pageSize * (page - 1);
    const idEnd: number = pageSize * page;
    const records: string = [...Array(this.totalRecords + 1).keys()].slice(1).slice(idStart, idEnd).join(',');
    this.charactersPerPage = await this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, records) as CharacterModel[];
    this.setLoading(false);
  }
  onChangePage(pageInfo: number[]): void { this.getCharactersFromAPI(); }
  onSelectCard(index: number): void { this.router.navigateByUrl(`${CHARACTER}/${index}`); }
  /********** GETTERS **********/
  getLoading = (): boolean => this.loading;
  getTotalRecords = (): number => this.totalRecords;
  getCharactersPerPage = (): CharacterModel[] => this.charactersPerPage;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { this.loading = loading; }
}
