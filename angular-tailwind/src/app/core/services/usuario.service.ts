import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { usuario } from '../models/usuario.model';
import { retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`; 
  private listaCambio = new Subject<usuario[]>();
  constructor(private httpClient: HttpClient) {}
Listar() {
    return this.httpClient.get<usuario[]>(`${this.url}/listar`);
  }
setList(listaNueva: usuario[]) {
    return this.listaCambio.next(listaNueva);
  }
getList() {
    return this.listaCambio.asObservable();
  }
Registrar(usuario: usuario) {
    return this.httpClient.post(`${this.url}/registrar`,usuario);
  }
Actualizar (id_actual: number, usuario: usuario){
  return this.httpClient.put(`${this.url}/actualizar`,usuario);
}
 
}