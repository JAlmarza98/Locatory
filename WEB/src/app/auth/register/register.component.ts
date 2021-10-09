import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
        role: ['USER_ROLE'],
      },
      {
        validators: this.passwordsIguales('password', 'password2'),
      },
  );

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  register() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return Swal.fire('Error', 'Los campos introducidos no son validos', 'error');
    }

    this.userService.crearUsuario(this.registerForm.value).subscribe(
        (resp) => {
          Swal.fire('Enhorabuena', 'Su cuenta ha sido creada con exito', 'success');
          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire('Error', err.error.errors[0].msg, 'error');
        });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true});
      }
    };
  }
}
