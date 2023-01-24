import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../models/Appointment';
import { Patient } from '../../models/Patient';
import { AppointmentsService } from '../../services/appointments.service';
import { PatientsService } from '../../services/patients.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.css']
})
export class AppointmentsFormComponent implements OnInit {

  id: string = '';
  idPatient ='';
  patients: Patient[] = [];
  patient: Patient = new Patient;
  appointment: Appointment = new Appointment; 
  selectedPatient: string = '';
  subtitle='Filtrar por nombre o apellido'

  constructor(private location:Location, 
              private router:Router, 
              private activatedRoute:ActivatedRoute, 
              private patient_service:PatientsService, 
              private appointment_service:AppointmentsService,
              private auth_service: AuthenticationService) { }
  
  currentUser: Usuario;

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.id = this.activatedRoute.snapshot.params['id'];
    this.idPatient = this.activatedRoute.snapshot.params['id_patient'];

    if(this.id == undefined || this.id == '') {
      this.id = 'new';
    } else {
     this.getAppointment()
    }

    if(this.idPatient != undefined){
      this.getPatient(this.idPatient);
    } else {
      this.getPatients()
    }

  }

  getAppointment(){
    this.appointment_service.getAppointment(this.id)
    .subscribe(
      result => {
        this.appointment = result;
        this.patient = this.appointment.patient;
        this.selectedPatient = this.patient.nombre + ' ' + this.patient.apellido;
      }
    )
  }

  getPatient(id:string){
    this.patient_service.getPatient(id)
    .subscribe(
      result => {
        this.patient = result;
        this.selectedPatient = this.patient.nombre + ' ' + this.patient.apellido;
      }
    )
  }

  getPatients(){
    this.patient_service.getPatients(this.auth_service.currentUserValue.organizacion._id)
    .subscribe(
      result => {
        this.patients = result;
      }
    )
  }

  //Se va a romper cuando ponga segundo nombre
  newAppointment(){
    if(this.idPatient == undefined){
     let name = this.selectedPatient.split(' ');
     let selected = this.patients.filter(
       (patient) => {
         if (patient.nombre == name[0] &&  patient.apellido == name[1]){
           return patient;
         } else {
           return false;
         }
       }
     );
     
     this.appointment.patient = selected[0];
     this.appointment.sobreturno = true;
     this.appointment.asignado = true;
     this.appointment.organizacion=this.currentUser.organizacion;
     this.appointment_service.newAppointment(this.appointment).subscribe(
       () => {
        Swal.fire({
          title: 'Asignar?',
          text: "Asignar sobreturno a " + this.appointment.patient.nombre + ' ' + this.appointment.patient.apellido + ' el ' + this.appointment.fecha + ' a las ' + this.appointment.hora,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Asignar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Sobreturno asignado.',
              'success'
            )
            setTimeout(() => this.router.navigate(['/appointments-list']), 1000)
          }
        })
       }
     )
    } else {
     this.appointment.patient = this.patient;
     this.appointment.sobreturno = true;
     this.appointment.asignado = true;
     this.appointment_service.newAppointment(this.appointment).subscribe(
       () => {
        Swal.fire({
          title: 'Asignar?',
          text: "Asignar sobreturno a " + this.appointment.patient.nombre + ' ' + this.appointment.patient.apellido + ' el ' + moment(this.appointment.fecha).format('DD/MM/YYYY') + ' a las ' + this.appointment.hora,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Asignar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Sobreturno asignado.',
              'success'
            )
            setTimeout(() => this.router.navigate(['/consultas/', this.idPatient]), 1000)
          }
        })
       }
     )
    }
   }

  //Se va a romper cuando ponga segundo nombre
  updateAppointment() {
    let name = this.selectedPatient.split(' ');
    let selected = this.patients.filter(
      (patient) => {
        if (patient.nombre == name[0] &&  patient.apellido == name[1]){
          return patient;
        } else {
          return false;
        }
      }
    );

    this.appointment.patient = selected[0];
    this.appointment.sobreturno = true;
    this.appointment.asignado = true;
    this.appointment_service.updateAppointment(this.appointment._id, this.appointment)
    .subscribe(
      () => {
        Swal.fire({
          title: 'Editar?',
          text: "Editar sobreturno de " + this.appointment.patient.nombre + ' ' + this.appointment.patient.apellido + ' para el ' + moment(this.appointment.fecha).format('DD/MM/YYYY') + ' a las ' + this.appointment.hora,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Editar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Hecho!',
              'Sobreturno editado.',
              'success'
            )
            setTimeout(() => this.location.back(), 1000)
          }
        })
      }
    )
  }

  request() {
    if(this.id == "new") {
      if(this.selectedPatient != "Paciente") {
        this.newAppointment();
      }
    } else {
      this.updateAppointment();
    }
  }

  Cancelar() {
    if(this.idPatient != '') {
      this.router.navigate(['/consultas/', this.idPatient]);
    } else {
      this.location.back();
    }

  }

}
