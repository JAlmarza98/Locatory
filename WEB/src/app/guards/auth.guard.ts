import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import {UserService} from '../services/user.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validarToken().pipe(
        tap((isAuth) => {
          if (!isAuth) {
            this.router.navigateByUrl('/login');
          }
        }),
    );
  }
}
