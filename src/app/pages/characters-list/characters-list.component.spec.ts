import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { CharactersListComponent } from './characters-list.component';
import { ApiDataModel } from 'src/app/models/ApiData.model';
import { PAGE_SIZE } from 'src/app/constants/localStorage';
import { PAGE } from 'src/app/constants/queries';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CharactersListComponent Tests', () => {
  let serviceRouter: Router;
  let component: CharactersListComponent;
  const rickMortyService: RickMortyApiServiceService = new RickMortyApiServiceService(null as any);
  const fakeData: ApiDataModel = { info: {count: 671, pages: 34, next: null, prev: ''}, results: [] };
  const pageSizes: string[] = ['4', '6', '8', '10', '12', '15'];
  const fakeCharacters: any = [...Array(671).keys()];
  localStorage.setItem(PAGE, '1');

  beforeEach( () => component = new CharactersListComponent(rickMortyService, serviceRouter) );

  for (const pageSize of pageSizes) {
    it('Check if the length of the characters per page is equal to ' + pageSize, () => {
      spyOn(rickMortyService, 'getItemsFromAPI').and.callFake(data => of(fakeData));
      spyOn(rickMortyService, 'getItemsFromAPIByIds').and.callFake(characters => of(fakeCharacters));
      localStorage.setItem(PAGE_SIZE, pageSize);
      component.ngOnInit();
      expect(component.getCharactersPerPage().length).toBe(+pageSize);
    });
  }
});
