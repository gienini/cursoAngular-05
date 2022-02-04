import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,
    private authService : AuthService) { }

  ngOnInit(): void {
  }

  //Ir al backend a verificar si el usuario existe

  login () {
    this.authService.login().subscribe(resp=> {
      console.log('desde loginComponent sale '+resp);
      if (resp.id){
        this.router.navigate(['./heroes']);
      }
    });
    
  }

  ingresarSinLogin () {
    this.router.navigate(['./heroes']);
  }

}
