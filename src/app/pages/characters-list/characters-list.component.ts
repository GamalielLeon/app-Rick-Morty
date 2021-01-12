import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CHARACTER } from 'src/app/constants/paths';
import { CHARACTER_API, PAGE } from 'src/app/constants/queries';
import { CharacterModel } from 'src/app/models/character.model';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  characters: CharacterModel[] = [];

  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }
  ngOnInit(): void { this.getCharactersFromAPI(); }

  private getCharactersFromAPI(): void {
    this.rickMortyService.getItemsFromAPI(CHARACTER_API, [`${PAGE}=1`]).
      subscribe( data => this.characters = data.results as CharacterModel[] );
  }

  onSelectCard(index: number): void {
    this.router.navigateByUrl(`${CHARACTER}/${index}`);
  }

}
