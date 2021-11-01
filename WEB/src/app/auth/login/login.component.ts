import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
        (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
            localStorage.setItem('remember', 'true');
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire(
              'Error',
              'El correo o la contraseña introducidas no son correctas',
              'error');
        });
  }
}
