import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, tap, of, map } from 'rxjs';
import { Router } from '@angular/router';


const sufixUsuarios = '/usuarios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase : string = environment.baseUrl;

  constructor(private http : HttpClient,
              private router : Router) { }


  private _usuario : Auth | undefined ;

  get usuario() : Auth{
    return {... this._usuario!};
  }


  login (){
    return this.http.get<Auth>(`${this.urlBase}${sufixUsuarios}/1`).pipe(
        tap( auth => this._usuario= auth),
        tap( auth => localStorage.setItem('token', auth.id+'')),
    );
  }

  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.urlBase}${sufixUsuarios}/1`)
        .pipe(
          map( auth => {
            this._usuario = auth;
            return true;
          })
        );
  }

  

  logout() {
    this._usuario = undefined;
  }
}
