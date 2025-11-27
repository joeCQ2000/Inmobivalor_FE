import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/modules/layout/services/login.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  //verificar si el usuario esta autenticado
  const isLoggedIn = loginService.verificar();

  if(!isLoggedIn){
    return router.parseUrl('/login');
  }

  return true;
};
