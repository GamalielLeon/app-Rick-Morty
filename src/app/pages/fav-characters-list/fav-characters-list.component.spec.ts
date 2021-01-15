import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { FavCharactersListComponent } from './fav-characters-list.component';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import {TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterModel } from '../../models/character.model';
import { CHARACTER_API } from 'src/app/constants/queries';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('FavCharactersListComponent Tests', () => {
  let serviceRouter: Router;
  let component: FavCharactersListComponent;
  let serviceRickMorty: RickMortyApiServiceService;
  const fakeFavoriteIds: string[] = ['1', '2,5', '1,60,45', '4,5,9,17'];

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
      waitForAsync( () => {
        localStorage.setItem(FAV_CHARACTERS, favoriteIds);
        serviceRickMorty.getItemsFromAPIByIds(CHARACTER_API, favoriteIds).subscribe(
          characters => checkFavoritesLength(characters as CharacterModel[], favoriteIds),
          error => fail(error)
        );
      })
    );
  }

  function checkFavoritesLength(characters: CharacterModel[], favoriteIds: string): void {
    component.onCallAPIEnd(characters);
    expect(component.getFavoriteCharacters().length).toBe(favoriteIds.split(',').length);
  }
});
