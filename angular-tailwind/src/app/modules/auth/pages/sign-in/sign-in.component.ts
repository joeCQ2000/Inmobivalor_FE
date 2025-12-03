import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LoginService } from 'src/app/modules/layout/services/login.service';
import { JwtRequest } from 'src/app/modules/layout/models/jwtRequest';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _loginService: LoginService,
    private cdr: ChangeDetectorRef,
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form?.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const { username, password } = this.form.value;

    const request = new JwtRequest();
    request.username = username;
    request.password = password;

    this._loginService.login(request).subscribe({
      next: (data: any) => {
        //Caso 1 backend indica q se ha enviado OTP al correo

        if (data.requiresOtp) {
          //Guarda username para usarlo en Doble verificacion
          this._loginService.setPendingUsername(username);

          //redirigir al componente donde se ingresa el codigo
          this._router.navigate(['/auth/two-steps']); //la ruta para doble verificacion
          this.cdr.detectChanges();
          return;
        }

        //Caso 2 no hay OTP y viene el token directo(flujo antiguo)
        if (data.jwttoken) {
          sessionStorage.setItem('token', data.jwttoken);
          this._router.navigate(['/components/metodo_frances']);
          this.cdr.detectChanges();
          return;
        }

        console.error('Respuesta inesperada del servidor');
      },
      error: () => {
        console.error('Credenciales incorrectas');
        this.cdr.detectChanges();
      },
    });
  }
}
