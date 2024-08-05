import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent, PatientListComponent,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'patient-management-frontend';
}
