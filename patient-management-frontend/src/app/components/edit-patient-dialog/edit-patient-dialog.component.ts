import { Component, OnInit , ElementRef, Input, OnDestroy, Inject } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Patient} from '../../models/patient.model';

@Component({
  selector: 'app-edit-patient-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatButtonModule, MatDialogModule, MatInputModule, FormsModule],
  templateUrl: './edit-patient-dialog.component.html',
  styleUrl: './edit-patient-dialog.component.css'
})
export class EditPatientDialogComponent {
  @Input() currentPatient: Patient = {
    N_Dossier:'',
    CNIE:'',
    nom:'',
    prenom:'',
    Date_Naissance:'',
    sexe:'',
    provenance:'',
    niveauDeScolarite:'',
    couverture:'',
  };

    constructor(
        private patientService: PatientService,
        public dialogRef: MatDialogRef<EditPatientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Patient
      ) {
        this.currentPatient = { ...data };
      }
    ngOnInit(): void {
    }
    updatePatient(): void {
        this.patientService.update(this.currentPatient.N_Dossier, this.currentPatient).subscribe(() => {
          this.dialogRef.close(this.currentPatient); // Close the dialog and return updated data
        });
      }

    onCancel(): void {
        this.dialogRef.close();
    }
    
}
