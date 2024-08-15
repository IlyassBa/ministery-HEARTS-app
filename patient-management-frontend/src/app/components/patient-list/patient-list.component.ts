import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientService } from '../../service/patient.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatSelectModule, 
    MatDialogModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'N_Dossier', 'CNIE', 'nom', 'prenom', 'Date_Naissance', 'sexe', 'provenance', 'niveauDeScolarite', 'couverture'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.delete(N_Dossier)
          .subscribe(
            response => {
              this.retrievePatients(); // Refresh the list after deletion
            },
            error => {
              console.log(error);
            });
      }
    });
  }
  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.create(result).subscribe(() => {
          this.retrievePatients();
        });
      }
    });
  }

  openModifyPatientDialog(patient: Patient): void {
    console.log('Patient data:', patient);
    const dialogRef = this.dialog.open(EditPatientDialogComponent, {
      data: patient
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePatient(result);
      }
    });
  }

  updatePatient(patient:Patient): void{
    this.patientService.update(patient.N_Dossier, patient).subscribe(() => {
      this.retrievePatients(); // Refresh the list after update
    });
  }

  fileName= "ExcelPatients.xlsx";

  exportexcel(){
  if (!this.dataSource || !this.dataSource.data) {
    console.error('No data available for export');
    return;
  }
  const data = this.dataSource.data;
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
  XLSX.writeFile(wb, this.fileName);
  }
}
