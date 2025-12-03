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
usuarios : usuario[] = [];

constructor(
  private fb : FormBuilder,
  private router : Router,
  private clienteservice : ClienteService,
  private route : ActivatedRoute,
  private usuarioservice : UsuarioService

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
    es_activo : [0],
    aplica_bono :[0],
    usuario : ['',Validators.required],
  })
  const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.modoEdicion = true;
      this.id_actual = +id;
      this.cargarCliente(this.id_actual);
    }
    this.usuarioservice.Listar().subscribe({
    next: (data)=>{
      console.log('Usuarios :',data);
      this.usuarios =data;

    },
  });
}
cargarCliente(id: number) {

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
        usuario :data.usuario.id_usuario,
        es_activo :tobool(data.es_activo),
        aplica_bono : tobool(data.aplica_bono)
      });
   
    },
    error: (err) => console.error('Error al cargar el muestreo', err)
  });
}

Volver():void{
  this.router.navigate(['components/cliente'])
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

const cliente: Cliente = {
  id_cliente: this.modoEdicion && this.id_actual ? this.id_actual : 0,
  nombres   : formValue.nombres,
  apellidos : formValue.apellidos,
  telefono  : formValue.telefono,
  correo    : formValue.correo,
  dni       : formValue.dni,
  es_activo : formValue.es_activo,
  aplica_bono: formValue.aplica_bono,
  usuario: {
    id_usuario: formValue.usuario   
  } as usuario
};
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
