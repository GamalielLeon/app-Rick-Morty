import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterDetailComponent } from './character-detail.component';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FAV_CHARACTERS } from '../../constants/sesionStorage';
import { Observable, of } from 'rxjs';

xdescribe('CharacterDetailComponent Test', () => {
  let serviceActiveRoute: ActivatedRoute;
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailComponent ],
      providers: [ RickMortyApiServiceService ],
      imports: [ HttpClientModule, RouterTestingModule ]
    });
    fixture = TestBed.createComponent(CharacterDetailComponent);
    serviceActiveRoute: TestBed.inject(ActivatedRoute);
    // serviceActiveRoute = new ActivatedRoute();
    component = fixture.componentInstance;
  });

  it('Verify that when clicking the favorite button, the character id stores inside' +
    ' the "favCharacters" string in the sessionStorage', () => {
    const characterId: string = '2';
    // spyOnProperty(serviceActiveRoute, 'params', 'get').and.returnValue(+characterId); (By.css('.btn'))
    // const favButton = fixture.debugElement.nativeElement.querySelector('#favButton');
    setTimeout(() => {
      const favButton = fixture.debugElement.query( By.css('#favButton') );
      console.log(favButton);
      favButton.triggerEventHandler('click', null);
      let favCharacters: string[];
      favCharacters = (sessionStorage.getItem(FAV_CHARACTERS) || '').split(',');
      expect(favCharacters.includes(characterId)).toBeTruthy();
    }, 1000);
  });
});
