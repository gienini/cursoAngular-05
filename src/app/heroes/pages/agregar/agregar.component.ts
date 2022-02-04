import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img {
      width : 100%;
      border-radius: 5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    characters: ''
  }
  publishers = [
    {
      id: Publisher.DCComics,
      desc: 'DC'
    },
    {
      id: Publisher.MarvelComics,
      desc: 'Marvel'
    }
  ]

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    let idTMP: string | undefined;
    this.activatedRoute.params.subscribe(({ id }) => idTMP = id)
    if (!idTMP) {
      console.log('PANTALLA AGREGAR');
      return;
    }

    //MANERA ALTERNATIVA DE MIRAR URL ACTUAL
    // if (!this.router.url.includes('editar')){
    //   return
    // }
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroe(id))
    )
      .subscribe(heroe => this.heroe = heroe);
  }


  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.updateHeroe(this.heroe).subscribe(resp => {
        this.mostrarSnackbar('registro actualizado');
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => { this.router.navigate(['/heroes/editar', heroe.id]); this.mostrarSnackbar('registro creado'); }
        );
    }
  }

  eliminar() {
    const dialog = this.matDialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    // INTENTO DE SWITCHMAP NO FUNCIONA
    // dialog.afterClosed().subscribe(
    //   resp => {
    //     if (resp) {
    //       this.heroesService.deleteHeroe(this.heroe.id!)
    //         .pipe(
    //           switchMap( ({}) => this.router.navigate(['/heroes']))
    //         );
    //     }
    //   }
    // );

    dialog.afterClosed().subscribe(
      resp => {
        if (resp) {
          this.heroesService.deleteHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
            });

        }
      }
    );

  }

  mostrarSnackbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 5000
    });
  }

}
