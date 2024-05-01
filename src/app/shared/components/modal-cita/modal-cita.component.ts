import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cita } from 'src/app/core/interfaces/cita';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styleUrls: ['./modal-cita.component.scss'],
})
export class ModalCitaComponent  implements OnInit {

  @Input() cita: Cita | undefined;

  respuesta: string | undefined;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}
   // Método para cerrar el modal
   dismissModal() {
    this.modalController.dismiss();
  }

  // Booleano para saber si la cita tiene respuesta
  activo: boolean = false;
  
  // Método para activar la respuesta
  activateAnswer() {
    this.activo = true;
  }

  // Método para formatear una fecha de tipo Timestamp
  getCitaDate(timestamp: Timestamp): string {
    const date = timestamp.toDate(); // Convierte el Timestamp a un objeto Date
    return date.toLocaleString(); // Devuelve una cadena con la fecha y hora formateada
  }

  // Método para añadir las respuesta a la cita
  sendAnswer() {
    console.log("Respuesta: ", this.respuesta);
    if(this.cita){
      this.cita.respuesta = this.respuesta;
    }
    console.log("Cita a responder: ", this.cita);
    this.modalController.dismiss(this.cita);
  }

}