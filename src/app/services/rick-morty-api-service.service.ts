import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterModel } from 'src/app/models/character.model';
import { LocationModel } from 'src/app/models/location.model';
import { ApiDataModel } from 'src/app/models/ApiData.model';
import { EpisodeModel } from 'src/app/models/episode.model';
import { API_URL } from 'src/app/constants/urls';
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
