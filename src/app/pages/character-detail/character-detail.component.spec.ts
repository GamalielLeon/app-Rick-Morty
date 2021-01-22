import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { PopUpEpisodeComponent } from 'src/app/components/pop-up-episode/pop-up-episode.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { CharacterDetailComponent } from './character-detail.component';

describe('CharacterDetailComponent Test', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  const characterIds: string[] = ['2', '14', '389'];

  // It is neccessary to add all the components involved into the 'declarations' array.
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailComponent, LoaderComponent, PopUpEpisodeComponent ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [ RickMortyApiServiceService ]
    });
  });

  for (const characterId of characterIds) {
    it(`When clicking the favorite button, the character.id = ${characterId} stores inside ` +
    'the sessionStorage', (done) => {
      // It is possible to override the provider as long as the component has not been created.
      TestBed.overrideProvider(ActivatedRoute, { useValue: { params: of({id : +characterId}) } });
      fixture = TestBed.createComponent(CharacterDetailComponent);
      setTimeout(() => {
        fixture.detectChanges();  // Used to detect changes on the HTML and update it.
        fixture.debugElement.query(By.css('#addFavoriteBtn')).triggerEventHandler('click', null);
        // fixture.nativeElement.querySelector('#addFavoriteBtn').click();
        const favCharacters = (sessionStorage.getItem(FAV_CHARACTERS) || '').split(',');
        expect(favCharacters.includes(characterId)).toBeTruthy();
        done();
      }, 2000);
    });
  }
});
