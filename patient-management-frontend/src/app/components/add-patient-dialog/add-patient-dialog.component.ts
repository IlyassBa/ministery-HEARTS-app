import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-patient-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './add-patient-dialog.component.html',
  styleUrl: './add-patient-dialog.component.css'
})
export class AddPatientDialogComponent {
  
  
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatientDialogComponent>
  ) {
    this.patientForm = this.fb.group({
      N_Dossier: ['', Validators.required],
      CNIE: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      Date_Naissance: ['', Validators.required],
      sexe: ['', Validators.required],
      provenance: ['', Validators.required],
      niveauDeScolarite: ['', Validators.required],
      couverture: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
