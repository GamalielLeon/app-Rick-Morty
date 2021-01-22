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

  getItemsFromAPI(query: string, filters: string[] = []): Promise<ApiDataModel> {
    return this.http.get<ApiDataModel>(`${API_URL + query}?${filters.join('&')}`).toPromise();
  }
  getItemsFromAPIByIds(query: string, ids: string): Promise<APIdataArray|APIdata> {
      return this.http.get<APIdataArray|APIdata>(`${API_URL + query}/${ids}`).toPromise();
  }
  getItemFromAPI(query: string, id: number): Promise<APIdata> {
    return this.http.get<APIdata>(`${API_URL + query}/${id}`).toPromise();
  }
}
