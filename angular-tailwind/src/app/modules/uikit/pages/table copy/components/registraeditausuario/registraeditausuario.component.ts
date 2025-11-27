import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../../../core/services/usuario.service';
import Swal from 'sweetalert2';
import { usuario } from '../../../../../../core/models/usuario.model';
@Component({
  selector: 'app-registraeditausuario',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  standalone : true,
  templateUrl: './registraeditausuario.component.html',
  styleUrl: './registraeditausuario.component.css'
})
export class RegistraeditausuarioComponent implements OnInit {
  
usuarioform! : FormGroup;
HttpClient : any;
constructor(
  private fb : FormBuilder,
  private router : Router,
  private usuarioservice : UsuarioService,
  private route : ActivatedRoute,

){}
modoEdicion = false;
submitted = false;
id_actual : number| null = null;
ngOnInit(): void {
  this.usuarioform = this.fb.group({
    contrasenha : ['', Validators.required],
    username : ['',Validators.required],
    nombres : ['', Validators.required],
    apellidos : ['', Validators.required],
    correo : ['', Validators.required],
    telefono : ['', Validators.required],
    dni : ['', Validators.required],
    estado : [0, Validators.required],
    
  })
    
   const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.modoEdicion = true;
      this.id_actual = +id;
      this.cargarUsuario(this.id_actual);
    }
}

cargarUsuario(id: number) {
  this.usuarioservice.listId(id).subscribe({
    next: (data) => {
      console.log('Datos del muestreo a editar:', data);
      const toBool = (v: any) => v === true || v === 1;

      this.usuarioform.patchValue({
        contrasenha: data.contrasenha,
        username: data.username,
        nombres: data.nombres,
        apellidos: data.apellidos,
        correo: data.correo,
        telefono: data.telefono,
        dni: data.dni,
        estado: toBool(data.estado),
      });

    },
    error: (err) => console.error('Error al cargar el muestreo', err)
  });
}
Volver():void{
  this.router.navigate(['components/table copy'])
}
registrar(): void{
  this.submitted = true;
  if (this.usuarioform.invalid) {
    this.usuarioform.markAllAsTouched();
    window.scrollTo({top: 0, behavior:'smooth'});
    Swal.fire({
      icon: 'error',
      title: 'Favor de rellenar los datos faltantes',
      toast : true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      background:'#1E293B',
      color: '#ffff'

    })
    return;
  }
  const formValue = this.usuarioform.getRawValue();
  const usuario: usuario ={
    ...formValue,
  }
  if (this.modoEdicion && this.id_actual) {
    // PUT
    (usuario as any).id_usuario = this.id_actual;

    this.usuarioservice.Actualizar(this.id_actual, usuario).subscribe({
      next: (resp) => {
        console.log('Actualización exitosa', resp);
        Swal.fire({
      icon: 'success',
      title: 'Muestreo actualizado correctamente',
      toast : true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      background:'#1E293B',
      color: '#ffff'

    })
        this.router.navigate(['/components/table copy']);
      },
      error: (err) => {
        console.error('Error al actualizar', err);

        Swal.fire({
      icon: 'warning',
      title: 'Ocurrio un error en el actualizado',
      toast : true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      background:'#1E293B',
      color: '#ffff'

    })
      }
    });
  } else {
    // POST
    this.usuarioservice.Registrar(usuario).subscribe({
      next: (resp) => {
        console.log('Registro exitoso', resp);
        Swal.fire({
      icon: 'success',
      title: 'Muestreo registrado correctamente',
      toast : true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      background:'#1E293B',
      color: '#ffff'

    })
        this.router.navigate(['/components/table']);
      },
      error: (err) => {
        console.error('Error al registrar', err);
       Swal.fire({
      icon: 'error',
      title: 'Ocurrio un error en el registrado',
      toast : true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
      background:'#1E293B',
      color: '#ffff'

    })
      }
    });
  }
}
}
