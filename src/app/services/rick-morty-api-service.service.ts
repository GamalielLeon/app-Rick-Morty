import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDataModel } from '../models/ApiData.model';
import { Observable } from 'rxjs';
import { CharacterModel } from '../models/character.model';
import { LocationModel } from '../models/location.model';
import { EpisodeModel } from '../models/episode.model';
import { API_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiServiceService {

  constructor(private http: HttpClient) { }

  getItemsFromAPI(query: string, filters: string[] = []): Observable<ApiDataModel> {
    return this.http.get<ApiDataModel>(`${API_URL + query}?${filters.join('&')}`);
  }

  getItemFromAPI(query: string, id: number): Observable<CharacterModel|LocationModel|EpisodeModel> {
    return this.http.get<CharacterModel|LocationModel|EpisodeModel>(`${API_URL + query}/${id}`);
  }
}
