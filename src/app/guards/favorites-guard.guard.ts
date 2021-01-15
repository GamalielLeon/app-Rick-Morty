import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { CHARACTER_API } from 'src/app/constants/queries';
import { CHARACTERS } from 'src/app/constants/paths';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesGuard implements CanActivate {
  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }

  private onFailedCallAPI(): Observable<boolean> {
    sessionStorage.removeItem(FAV_CHARACTERS);
    this.router.navigateByUrl(CHARACTERS);
    return of(false);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // Use a regular expression to replace all the blank characters and zeros for a '*'.
      const favoritesIds: string = (sessionStorage.getItem(FAV_CHARACTERS) || '*').replace(/ |0/g, '*');
      return this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, favoritesIds).
        pipe( map(characters => true), catchError(error => this.onFailedCallAPI()) );
     }
}
