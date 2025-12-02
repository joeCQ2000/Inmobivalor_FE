import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    FormsModule,
    RouterLink,
    AngularSvgIconModule,
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType = false;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      contrasenha: ['', [Validators.required, Validators.minLength(6)]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      estado: [true, [Validators.required]],
      otpRequired: [false], // si quieres manejar la doble autenticación
    });
  }

   get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // armamos el objeto usuario según tu backend
    const nuevoUsuario: any = {
      username: this.form.value.username,
      contrasenha: this.form.value.contrasenha,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      correo: this.form.value.correo,
      dni: this.form.value.dni,
      estado: this.form.value.estado,
      telefono: this.form.value.telefono,
      otpRequired: this.form.value.otpRequired,
      // NO mandamos id_usuario, otpCode, otpExpiry
    };

    this.usuarioService.Registrar(nuevoUsuario).subscribe({
      next: () => {
        this.loading = false;
        // redirige al login
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
        this.loading = false;
        this.errorMessage = 'Ocurrió un error al registrar el usuario. Inténtalo nuevamente.';
      },
    });
  }
}
