import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Heroe } from '../pages/interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const sufixHeroes = '/heroes'
const queryGet = 'q='
const queryLimit = '_limit=6'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlBackend = environment.baseUrl;

  constructor(private httpClient : HttpClient) {  }

  getHeroes() : Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(this.urlBackend+sufixHeroes);
  }

  getHeroe(id : string) : Observable<Heroe> {
    return this.httpClient.get<Heroe>(this.urlBackend+sufixHeroes+'/'+id);
  }

  getSugerencias(termino : string) : Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(this.urlBackend+sufixHeroes+'?'+queryGet+termino+'&'+queryLimit);
  }

  agregarHeroe(heroe : Heroe) : Observable<Heroe>{
    return this.httpClient.post<Heroe>(this.urlBackend+sufixHeroes, heroe);
  }

  updateHeroe(heroe : Heroe) : Observable<Heroe>{
    return this.httpClient.put<Heroe>(this.urlBackend+sufixHeroes+'/'+heroe.id, heroe);
  }

  deleteHeroe(id : string) : Observable<any>{
    return this.httpClient.delete<any>(this.urlBackend+sufixHeroes+'/'+id);
  }

  
}
