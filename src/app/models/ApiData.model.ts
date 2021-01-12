import { CharacterModel } from './character.model';
import { LocationModel } from './location.model';
import { EpisodeModel } from './episode.model';
export interface ApiDataModel{
  info: {
    count: number;
    pages: number;
    next: string|null;
    prev: string|null;
  };
  results: CharacterModel[] | LocationModel[] ;
}
