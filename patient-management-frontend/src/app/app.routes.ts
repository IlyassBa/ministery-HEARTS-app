import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { AppComponent } from './app.component';
import { PatientsComponent } from './components/patients/patients.component';

export const routes: Routes = [
    {path: '', component:AuthentificationComponent },
    {path: 'patients', component: PatientsComponent},
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
