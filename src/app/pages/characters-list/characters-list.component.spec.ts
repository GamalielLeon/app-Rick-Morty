import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { CharactersListComponent } from './characters-list.component';
import { ApiDataModel } from 'src/app/models/ApiData.model';
import { PAGE_SIZE } from 'src/app/constants/sesionStorage';
import { PAGE } from 'src/app/constants/queries';
import { Router } from '@angular/router';

describe('CharactersListComponent Tests', () => {
  let serviceRouter: Router;
  let component: CharactersListComponent;
  const rickMortyService: RickMortyApiServiceService = new RickMortyApiServiceService(null as any);
  const fakeData: ApiDataModel = { info: {count: 671, pages: 34, next: null, prev: ''}, results: [] };
  const pageSizes: string[] = ['4', '12'];
  const fakeCharacters: any = [...Array(671).keys()];
  sessionStorage.setItem(PAGE, '1');

  beforeEach( () => component = new CharactersListComponent(rickMortyService, serviceRouter) );

  for (const pageSize of pageSizes) {
    it('Check if the length of the characters per page is equal to ' + pageSize, async (done) => {
      spyOn(rickMortyService, 'getItemsFromAPI').and.returnValue(Promise.resolve(fakeData));
      spyOn(rickMortyService, 'getItemsFromAPIByIds').and.returnValue(Promise.resolve(fakeCharacters));
      sessionStorage.setItem(PAGE_SIZE, pageSize);
      await component.getCharactersFromAPI();
      expect(component.getCharactersPerPage().length).toBe(+pageSize);
      done();
    });
  }
});
