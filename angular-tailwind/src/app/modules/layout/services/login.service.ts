import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { VerifyOtpRequest } from '../models/VerifyOtpRequest';
import { JwtResponse } from '../models/jwtResponse';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${base_url}`;
  constructor(private http:HttpClient) { }

  login(request:JwtRequest){
    return this.http.post(`${this.url}/login`, request);
  };

  verifyOtp(request: VerifyOtpRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.url}/login/verify-otp`, request);
  }


  //Guardar y obetner el username pendiente del OTP
  setPendingUsername(username: string): void {
    sessionStorage.setItem('pendingUsername',username);
  }

  getPendingUsername(): string | null {
    return sessionStorage.getItem('pendingUsername');
  }

  clearPendingUsername(): void {
    sessionStorage.removeItem('pendingUsername');
  }

  verificar(){
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole(){
    let token = sessionStorage.getItem('token');
    if(!token){

      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showUsername(){
    let token = sessionStorage.getItem('token');
    if(!token){
      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.username;
  }
}
