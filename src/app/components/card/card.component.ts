import { Component, Input, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/character.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() characterData: CharacterModel | any = {};

  constructor() { }
  ngOnInit(): void { }
}
