import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentsFormComponent } from './components/appointments-form/appointments-form.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AnouncementsComponent } from './components/anouncements/anouncements.component';
import { ConsultaFormComponent } from './components/consulta-form/consulta-form.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { MedicalHistoryFormComponent } from './components/medical-history-form/medical-history-form.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { SellectPatientComponent } from './components/sellect-patient/sellect-patient.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers';
import { PlantillaDietaComponent } from './components/plantilla-dieta/plantilla-dieta.component';
import { PlantillaDietaFormComponent } from './components/plantilla-dieta-form/plantilla-dieta-form.component';
import { PlantillaDietaListComponent } from './components/plantilla-dieta-list/plantilla-dieta-list.component';
import { DietaComponent } from './components/dieta/dieta.component';
import { DietaFormComponent } from './components/dieta-form/dieta-form.component';
import { DietsHistoryComponent } from './components/diets-history/diets-history.component';
import { InbodyComponent } from './components/inbody/inbody.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
  {path:'appointments-form', component: AppointmentsFormComponent, canActivate: [AuthGuard]},
  {path:'appointments-form/:id', component: AppointmentsFormComponent, canActivate: [AuthGuard]},
  {path:'appointments-form/:id/:id_patient', component: AppointmentsFormComponent, canActivate: [AuthGuard]},
  {path:'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  // {path:'log-in', component:LogInComponent, canActivate: [AuthGuard]},
  {path:'medical-history/:id/:id_patient', component: MedicalHistoryComponent, canActivate: [AuthGuard]},
  {path:'patient-form/:id/:route', component: PatientFormComponent, canActivate: [AuthGuard]},
  {path:'patient-info/:id', component: PatientInfoComponent, canActivate: [AuthGuard]},
  {path:'patients-list', component: PatientsListComponent, canActivate: [AuthGuard]},
  {path:'anouncements', component: AnouncementsComponent, canActivate: [AuthGuard]},
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'consulta-form/:id_patient/:id/:id_consulta', component:ConsultaFormComponent, canActivate: [AuthGuard]},
  {path:'consulta-form/:id_patient/:id', component:ConsultaFormComponent, canActivate: [AuthGuard]},
  {path:'consultas/:id', component: ConsultasComponent, canActivate: [AuthGuard]},
  {path:'medical-history-form/:id/:id_patient', component: MedicalHistoryFormComponent, canActivate: [AuthGuard]},
  {path:'appointments-list', component: AppointmentsListComponent, canActivate: [AuthGuard]},
  {path:'appointments-list/:id', component: AppointmentsListComponent, canActivate: [AuthGuard]},
  {path:'select-patient/:id', component:SellectPatientComponent, canActivate: [AuthGuard]},
  {path:'plantilla-dieta-component/:id', component:PlantillaDietaComponent, canActivate: [AuthGuard]},
  {path:'plantilla-dieta-list', component:PlantillaDietaListComponent, canActivate: [AuthGuard]},
  {path:'plantilla-dieta-form', component:PlantillaDietaFormComponent, canActivate: [AuthGuard]},
  {path:'plantilla-dieta-form/:id', component:PlantillaDietaFormComponent, canActivate: [AuthGuard]},
  {path:'plantilla-dieta-form/:id/:origin', component:PlantillaDietaFormComponent, canActivate: [AuthGuard]},
  //{path:'dieta/:id/:patient_id/:dieta_id', component:DietaComponent, canActivate: [AuthGuard]},
  {path:'dieta/:id/:patient_id', component:DietaComponent, canActivate: [AuthGuard]},
  {path:'history/dieta/:dieta_id', component:DietaComponent, canActivate: [AuthGuard]},
  {path:'dieta-form/:id', component:DietaFormComponent, canActivate: [AuthGuard]},
  {path:'dieta-form/:id/:dieta_id', component:DietaFormComponent, canActivate: [AuthGuard]},
  {path:'history/:id', component:DietsHistoryComponent, canActivate: [AuthGuard]},
  {path:'inbody/:id', component:InbodyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
