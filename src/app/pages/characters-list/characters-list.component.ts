import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CHARACTER } from 'src/app/constants/paths';
import { ApiDataModel } from 'src/app/models/ApiData.model';
import { CharacterModel } from 'src/app/models/character.model';
import { CHARACTER_API, PAGE } from 'src/app/constants/queries';
import { CURRENT_PAGE, PAGE_SIZE } from 'src/app/constants/sesionStorage';
import { DEFAULT_PAGE, WAIT_LOAD,  DEFAULT_PAGE_SIZE } from 'src/app/constants/values';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  private charactersPerPage: CharacterModel[] = [];
  private characters: CharacterModel[] = [];
  private totalRecords: number = 1;
  private loading: boolean = true;

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI().catch(error => this.setLoading(false)); }
  /********** METHODS **********/
  private onCallAPIEnd(): void {
    const pageSize: number = +(sessionStorage.getItem(PAGE_SIZE) || DEFAULT_PAGE_SIZE);
    const page: number = +(sessionStorage.getItem(CURRENT_PAGE) || DEFAULT_PAGE);
    this.setCharactersPerPage(page, pageSize);
    this.setLoading(false);
  }
  async getCharactersFromAPI(): Promise<void> { // Private
    const apiData: ApiDataModel = await this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=1`]);
    const records: string = [...Array(apiData.info.count + 1).keys()].slice(1).join(',');
    this.characters = await this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, records) as CharacterModel[];
    this.totalRecords = apiData.info.count;
    this.onCallAPIEnd();
  }
  onChangePage(pageInfo: number[]): void { this.setCharactersPerPage(pageInfo[0], pageInfo[1]); }
  onSelectCard(index: number): void { this.router.navigateByUrl(`${CHARACTER}/${index}`); }
  /********** GETTERS **********/
  getLoading = (): boolean => this.loading;
  getTotalRecords = (): number => this.totalRecords;
  getCharactersPerPage = (): CharacterModel[] => this.charactersPerPage;
  /********** SETTERS **********/
  setLoading(loading: boolean): void { setTimeout(() => this.loading = loading, WAIT_LOAD); }
  setCharactersPerPage(page: number, pageSize: number): void {
    this.charactersPerPage = this.characters.slice(pageSize * (page - 1), page * pageSize );
  }
}
