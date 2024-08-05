import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientService } from '../../service/patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['N_Dossier', 'CNIE', 'nom', 'prenom', 'Date_Naissance', 'sexe', 'provenance', 'niveauDeScolarite', 'couverture', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.retrievePatients();
  }

  retrievePatients(): void {
    this.patientService.getAll()
  .subscribe({
    next: data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: error => {
      console.log(error);
    }
  });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePatient(N_Dossier: any): void {
    this.patientService.delete(N_Dossier)
      .subscribe(
        response => {
          this.retrievePatients();
        },
        error => {
          console.log(error);
        });
  }
}
