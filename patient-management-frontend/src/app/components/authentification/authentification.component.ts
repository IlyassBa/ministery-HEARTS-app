import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive , Router} from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})

export class AuthentificationComponent {
  RoyaumeLogo = 'data:image/jpeg;base64,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';
  @Input() currentUser: User={
  title : 'hello',
  Utilisateur:'',
  Password:'',
  Data: '',
  qrCode: '',
  Code:'',
}

  @ViewChild('qrContainer') qrContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('formContainer') formContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('AuthHeader') AuthHeader!: ElementRef<HTMLDivElement>;
  @ViewChild('FormCodeContainer') FormCodeContainer!: ElementRef<HTMLDivElement>;

  constructor(private apiService: PatientService, private router: Router) {
  }

  goBack() {
    this.qrContainer.nativeElement.style.display = "none";
    this.formContainer.nativeElement.style.display = "block";
    this.AuthHeader.nativeElement.style.display = "flex";
  }

  goForward() {
    this.FormCodeContainer.nativeElement.style.display = "block";
    this.formContainer.nativeElement.style.display = "none";
    this.qrContainer.nativeElement.style.display = "none";
    this.AuthHeader.nativeElement.style.display = "flex";
  }

  onSubmit() {
    if (this.currentUser.Utilisateur) {
      this.apiService.postUser(this.currentUser.Utilisateur)
        .subscribe(
          (response: any) => {
            this.qrContainer.nativeElement.style.display = "block";
            this.formContainer.nativeElement.style.display = "none";
            this.AuthHeader.nativeElement.style.display = "none";
            this.currentUser.qrCode = response; 
          },
          (error: any) => {
            console.log('Error:', error);
          }
        );
    } else {
      console.log('Utilisateur is undefined');
    }
  }
  

  verifyCode() {
    alert("hello")
    this.router.navigate(['/patients']);
    // this.apiService.verifyCode(this.Code, this.Utilisateur)
    //   .subscribe(
    //     (response) => {
    //       console.log('Verification response:', response);
    //     },
    //     (error) => {
    //       console.log('Verification error:', error);
    //     }
    //   );
  }
}