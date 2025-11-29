import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../../../../core/services/usuario.service';
import Swal from 'sweetalert2';
import { usuario } from '../../../../../../core/models/usuario.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/core/models/cliente.model';
@Component({
  selector: 'app-registraeditausuario',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  standalone : true,
  templateUrl: './registraeditacliente.component.html',
  styleUrl: './registraeditacliente.component.css'
})
export class RegistraeditaclienteComponent implements OnInit {

clienteForm! : FormGroup;
HttpClient : any;
constructor(
  private fb : FormBuilder,
  private router : Router,
  private clienteservice : ClienteService,
  private route : ActivatedRoute,

){}
modoEdicion = false;
submitted = false;
id_actual : number| null = null;
ngOnInit(): void {
  this.clienteForm = this.fb.group({
    nombres : ['', Validators.required],
    apellidos : ['',Validators.required],
    telefono : ['', Validators.required],
    correo : ['', Validators.required],
    dni : ['', Validators.required],
    es_activo : [0, Validators.required],
    usuario : [0, Validators.required],
  })
  const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.modoEdicion = true;
      this.id_actual = +id;
      this.cargarUsuario(this.id_actual);
    }
    
}
cargarUsuario(id: number) {

  this.clienteservice.listid(id).subscribe({
    next: (data) => {
      console.log('Datos del usuario a editar:', data);

      const tobool = (c :any) => c === true || c === 1;

      this.clienteForm.patchValue({
        nombres : data.nombres,
        apellidos : data.apellidos,
        telefono : data.telefono,
        correo : data.correo,
        dni : data.dni,
        es_activo :tobool(data.es_activo),
      });
   
    },
    error: (err) => console.error('Error al cargar el muestreo', err)
  });
}

Volver():void{
  this.router.navigate(['components/usuario'])
}
registrar(): void{
  this.submitted = true;
  if (this.clienteForm.invalid) {
    this.clienteForm.markAllAsTouched();
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
  const formValue = this.clienteForm.getRawValue();
  const cliente: Cliente ={
    ...formValue,
  }
  if (this.modoEdicion && this.id_actual) {
    // PUT
    (cliente as any).id_cliente = this.id_actual;

    this.clienteservice.Actualizar(this.id_actual, cliente).subscribe({
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
        this.router.navigate(['/components/cliente']);
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
    this.clienteservice.insert(cliente).subscribe({
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
        this.router.navigate(['/components/cliente']);
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
