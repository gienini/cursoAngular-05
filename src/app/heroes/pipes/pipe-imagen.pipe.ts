import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../pages/interfaces/heroes.interface';

@Pipe({
  name: 'pipeImagen',
  pure: false
})
export class PipeImagenPipe implements PipeTransform {

  transform(value: Heroe): string {
    if (!value.id){
      return `assets/no-image.png`;
    }else if (value.alt_img){
      return value.alt_img;
    }else{
      return `assets/heroes/${value.id}.jpg`;
    }

    if(value.alt_img){
      return '';
    }else{
      
    }
  }

}
