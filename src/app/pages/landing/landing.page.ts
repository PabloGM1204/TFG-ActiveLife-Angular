import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { EffectCoverflow } from 'swiper';

SwiperCore.use([EffectCoverflow]);
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet | undefined;

  constructor(
    private router: Router,
    private rutinaSvc: RutinaService,
    private authSvc: FirebaseService,
    private auth: AuthService,
    public translate: CustomTranslateService
  ) { }

  ionViewDidEnter() {
    // Coloca aquí el código que deseas ejecutar cada vez que el usuario entra en esta página
    console.log('El usuario ha entrado en esta página');
    //this.rutinasFiltered();
  }

  loguead: Boolean | undefined;

  ngOnInit() {
    this.rutinaSvc.subscribeToRutinaCollection();
    this.auth.isLogged$.subscribe(logged => {
      console.log(logged);
      this.loguead = logged;
      
    });
    setTimeout(() => {
      if (this.loguead) {
        console.log("Usuario logeado");
      } else {
        console.log("No hay usuario logeado");
        this.authSvc.connectAnonymously().then(() => {
          console.log("Conexión anónima exitosa");
          this.rutinasFiltered();
        }).catch((error) => {
          console.log("Error en la conexión anónima: ", error);
          this.auth.logOut();
          this.rutinasFiltered();
        });
      }
    }, 5000); // Espera 3 segundos (3000 milisegundos) antes de ejecutar el código dentro del setTimeout
  }

  // Configuración del swiper
  config: SwiperOptions = {
    effect: 'coverflow',
    slidesPerView: 3,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50, // Cambia el valor según lo que desees
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    initialSlide: 2,
  };

  items: any[] = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];


  rutinas: Rutina[] = [];

  // Filtrar las rutinas por las que son publicas
  rutinasFiltered() {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.public == true))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
      });
  }

  // Método para ir al Login/Registro
  goLogReg(){
    this.router.navigate(['/login'])
  }

  // Método para descargar el APK de la app
  downloadAPK(){
    console.log("Descargar APK")
  }

  // Método para ir a la página de about
  goAbout(){
    this.router.navigate(['/about'])
  }

  lang: string = "es";

  // Método para cambiar el idioma
  onLang(idioma: string) {
    console.log('Cambio de idioma');
    switch(idioma){
      case 'es':
        this.lang='es';
        break;
      case 'en':
        this.lang='en';
        break;
      case 'it':
        this.lang='it';
        break;
    }
    this.translate.use(this.lang);
    return false; 
  }

}
