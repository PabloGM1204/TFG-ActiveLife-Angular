import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'firebase/app';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { EffectCoverflow } from 'swiper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  activateChange: boolean = true;

  constructor(
    private auth: AuthService,
    private firebaseSvc: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  config: SwiperOptions = {
    loop: true,
  };

  items: any[] = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];

  // Método para cambiar entre el componente de Login y Registro
  changeComponent(){
    this.activateChange = !this.activateChange
  }

  // Método para hacer el login
  // al hacer click recibe los datos para el login y hacemos el login, en caso de ir bien pasaria al home
  onLogin(credencials: UserCredentials){
    this.auth.logOut();
    console.log("Datos login: ", credencials)
    this.auth.login(credencials).subscribe({
      next: data => {
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  // Método para hacer el registro
  // al hacer click recibe los datos para el registro y hacemos el registro, en caso de ir bien pasaria al home
  onRegister(credencials: UserCredentials){
    console.log("Datos registro: ", credencials)
    this.auth.register(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el registro ", data)
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
