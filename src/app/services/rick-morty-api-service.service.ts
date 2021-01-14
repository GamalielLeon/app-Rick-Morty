import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDataModel } from '../models/ApiData.model';
import { Observable } from 'rxjs';
import { CharacterModel } from '../models/character.model';
import { LocationModel } from '../models/location.model';
import { EpisodeModel } from '../models/episode.model';
import { API_URL } from '../constants/urls';
type APIdataArray = CharacterModel[]|LocationModel[]|EpisodeModel[];
type APIdata = CharacterModel|LocationModel|EpisodeModel;

@Injectable({
  providedIn: 'root'
})
export class RickMortyApiServiceService {

  constructor(private http: HttpClient) { }

  getItemsFromAPI(query: string, filters: string[] = []): Observable<ApiDataModel> {
    return this.http.get<ApiDataModel>(`${API_URL + query}?${filters.join('&')}`);
  }
  getItemsFromAPIByIds(query: string, ids: string): Observable<APIdataArray|APIdata> {
      return this.http.get<APIdataArray|APIdata>(`${API_URL + query}/${ids}`);
  }
  getItemFromAPI(query: string, id: number): Observable<APIdata> {
    return this.http.get<APIdata>(`${API_URL + query}/${id}`);
  }
}
