import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RickMortyApiServiceService } from 'src/app/services/rick-morty-api-service.service';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { CHARACTER_API } from 'src/app/constants/queries';
import { CHARACTERS } from 'src/app/constants/paths';

@Injectable({
  providedIn: 'root'
})
export class FavoritesGuard implements CanActivate {
  constructor(private rickMortyService: RickMortyApiServiceService, private router: Router) { }

  private onFailedCallAPI(): boolean {
    sessionStorage.removeItem(FAV_CHARACTERS);
    this.router.navigateByUrl(CHARACTERS);
    return false;
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      // Use a regular expression to replace all the blank characters and zeros for a '*'.
      const favoritesIds: string = (sessionStorage.getItem(FAV_CHARACTERS) || '*').replace(/ |0/g, '*');
      return await this.rickMortyService.getItemsFromAPIByIds(CHARACTER_API, favoritesIds)
                                        .then(data => true).catch(error => this.onFailedCallAPI());
     }
}
