import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FAV_CHARACTERS } from 'src/app/constants/sesionStorage';
import { CHARACTERS } from 'src/app/constants/paths';

@Injectable({
  providedIn: 'root'
})
export class FavoritesGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const areThereFavorites: boolean = Boolean(sessionStorage.getItem(FAV_CHARACTERS));
      if (!areThereFavorites) { this.router.navigateByUrl(CHARACTERS); }
      return areThereFavorites;
    }
}
