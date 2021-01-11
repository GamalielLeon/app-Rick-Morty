import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCharactersListComponent } from './fav-characters-list.component';

describe('FavCharactersListComponent', () => {
  let component: FavCharactersListComponent;
  let fixture: ComponentFixture<FavCharactersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavCharactersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
