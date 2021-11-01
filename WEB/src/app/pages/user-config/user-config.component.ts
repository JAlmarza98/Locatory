import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ConfirmModalData, Usuario} from 'src/app/models';
import {NotificationService, UserService} from 'src/app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmComponent} from 'src/app/components';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
})
export class UserConfigComponent implements OnInit {
  user!: Usuario;
  public userUpdateForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['USER_ROLE'],
      },
  );

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.obtenerMiData().subscribe((response:any) => {
      this.user = response.me;

      console.log(this.user);
      this.userUpdateForm = this.fb.group({
        name: new FormControl(this.user.name, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required]),
        password: new FormControl(''),
        role: ['USER_ROLE'],
      });
    });
  }

  updateUserData(): void {
    this.userService.updateUserData(this.userUpdateForm.value, this.user._id).subscribe( (response:Usuario) => {
      if (response as Usuario) {
        this.notificationService.success('Perfil Actualizado', 'Los cambios en su pefil ya se han hecho efectivos');
      } else {
        this.notificationService.error('Error al Actualizar', 'Los cambios en su pefil no se han podido hacer efectivos');
      }
    });
  }

  deleteAccount(): void {
    const deletePinData: ConfirmModalData = {
      actionBtn: 'Borrar',
      title: `Eliminar cuenta`,
      icon: 'far fa-trash-alt fa-9x',
      text: `Se va a eliminar su cuenta de usuario, esta acción no se puede deshacer. ¿Desea continuar?`,
    };

    const modalDialog = this.modalService.open( ConfirmComponent,
        {
          backdrop: 'static',
          size: 'lg',
          keyboard: false,
          centered: true,
          scrollable: false,
        });

    modalDialog.componentInstance.confirmModalData = deletePinData;

    modalDialog.result.then((result: boolean) => {
      if (result) {
        this.userService.deleteAccount(this.user._id).subscribe((response:any) => {
          if (response.msg) {
            this.router.navigateByUrl('/login');
          } else {
            this.notificationService.error('Error al Eliminar', 'Su pefil no se han podido ser eliminado');
          }
        });
      } else {
        this.notificationService.error('Error al Eliminar', 'Su pefil no se han podido ser eliminado');
      }
    });
  }
}
