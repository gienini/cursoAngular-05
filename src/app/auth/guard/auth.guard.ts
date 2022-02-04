import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      return this.authService.verificaAutenticacion().pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      );
      // let retorno : boolean = false;
      // console.log(this.authService.usuario);
      // if (this.authService.usuario.id){
      //   retorno = true;
      // }else{
      //   console.log('bloqueado por canACTIVATE');
      // }
      // return retorno;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
      return true;

      return this.authService.verificaAutenticacion().pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      );
      // let retorno : boolean = false;
      // if (this.authService.usuario.id){
      //   retorno = true;
      // }else{
      //   console.log('bloqueado por canload');
      // }
      // return retorno;
  }

  constructor (private authService: AuthService, private router : Router){

  }
}
