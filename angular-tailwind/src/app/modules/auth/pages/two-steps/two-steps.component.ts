import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyOtpRequest } from 'src/app/modules/layout/models/VerifyOtpRequest';
import { LoginService } from 'src/app/modules/layout/services/login.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-two-steps',
  templateUrl: './two-steps.component.html',
  styleUrls: ['./two-steps.component.css'],
  imports: [FormsModule],
})
export class TwoStepsComponent implements OnInit {
 
  public inputs = Array(6);
  public otpDigits: string[] = new Array(6).fill('');

  public errorMessage: string = '';
  public loading: boolean = false;

   constructor(
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,
   ) {}

  ngOnInit(): void {}

  onInputChange(event: any, index:number): void {
    const value: string = event.target.value;
    if(value && value.length === 1 && index <this.inputs.length -1){
      const next = event.target.nextElementSibiling as HTMLInputElement;
      if(next){
        next.focus();
      }
    }
  }

    onSubmitOtp(): void {
    this.errorMessage = '';

    const username = this.loginService.getPendingUsername();
    if (!username) {
      this.errorMessage = 'No se encontró el usuario pendiente de verificación. Vuelva a iniciar sesión.';
      this.cdr.detectChanges();
      return;
    }

    // Unir los 6 dígitos en un solo string
    const otp = this.otpDigits.join('').trim();

    if (otp.length !== 6) {
      this.errorMessage = 'Ingrese los 6 dígitos del código de verificación.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;

    const request: VerifyOtpRequest = {
      username: username,
      otp: otp,
    };

    this.loginService.verifyOtp(request).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.jwttoken) {
          // Guardar token, limpiar username pendiente y navegar
          sessionStorage.setItem('token', res.jwttoken);
          this.loginService.clearPendingUsername();
          this.router.navigate(['/components/metodo_frances']);
          this.cdr.detectChanges();
        } else {
          this.errorMessage = 'Respuesta inesperada del servidor.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.errorMessage = 'Código incorrecto o expirado.';
        console.error(err);
        this.cdr.detectChanges();
      },
    });
  }

}
