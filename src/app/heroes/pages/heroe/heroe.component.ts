import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img{  
    width:100%;
    border-radius: 5px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private heroesService : HeroesService, private router : Router) { 
    // this.route.url.subscribe( urlSegment=> console.log(urlSegment.pop()?.path) );
  }

  ngOnInit(): void {
    let idHeroe : string = '';
    this.activatedRoute.params.pipe( switchMap (({ id }) =>this.heroesService.getHeroe(id))).subscribe( heroe=> this.heroe = heroe); //Se llama id porque lo llamamos asi en el routes???
    // this.getHeroe(idHeroe);
  }

  // getHeroe(id : string) {
  //   setTimeout('test', 5000);
  //   this.heroesService.getHeroe(id).subscribe(  resp => this.heroe = resp );
  // }

  heroe !: Heroe;


  volver(){
    this.router.navigate(['/heroes/listado']);
  }

}
