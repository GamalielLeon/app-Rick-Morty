import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { FavCharactersListComponent } from './fav-characters-list.component';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('FavCharactersListComponent Tests', () => {
  let serviceRouter: Router;
  let component: FavCharactersListComponent;
  let serviceRickMorty: RickMortyApiServiceService;
  const fakeFavoriteIds: string[] = ['1', '16,7,345'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FavCharactersListComponent ],
      providers: [ RickMortyApiServiceService ],
      imports: [ HttpClientModule, RouterTestingModule ]
    });
    serviceRouter = TestBed.inject(Router);
    serviceRickMorty = TestBed.inject(RickMortyApiServiceService);
    component = new FavCharactersListComponent(serviceRickMorty, serviceRouter);
  });

  for (const favoriteIds of fakeFavoriteIds) {
    it('Check if the number of favorite characters is equal to ' + favoriteIds.split(',').length.toString(),
      async (done) => {
        sessionStorage.setItem(FAV_CHARACTERS, favoriteIds);
        await component.getCharactersFromAPI();
        expect(component.getFavoriteCharacters().length).toBe(favoriteIds.split(',').length);
        done();
    });
  }
});
