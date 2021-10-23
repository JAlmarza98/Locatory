import {Component, OnInit} from '@angular/core';
import {ConfirmComponent} from 'src/app/components';
import {ICategoria, CargarPins, Pin, IPin, ConfirmModalData} from 'src/app/models';
import {PinService, NotificationService} from 'src/app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pinsCollection: Pin[] = [];

  lat = 40.26923811554885;
  lng = -3.921616256343138;
  sidebar!: boolean;

  currentCategory!: ICategoria;
  totalPins!: number;

  constructor(
    private pinService: PinService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  showSidebar(event: boolean): void {
    this.sidebar = event;
  }

  showPinsCollection(category: ICategoria): void {
    this.currentCategory = category;

    this.pinService
        .getPinsByCategory(category.id)
        .subscribe((response: CargarPins) => {
          if (response.total_pins !== 0) {
            this.totalPins = response.total_pins;
            this.pinsCollection = response.pins;
          } else {
            this.notificationService.info(
                'No hay marcadores',
                'Actualmente no existen marcadores para esta colección.',
                3000,
            );
          }
        });
  }

  editPin(pin: IPin): void {
    console.log(pin);
  }

  deletePin(pin: IPin): void {
    const deletePinData: ConfirmModalData = {
      actionBtn: 'Borrar',
      title: `Eliminar  marcador '${pin.name}'`,
      icon: 'far fa-trash-alt fa-9x',
      text: `Se va a eliminar el marcador '${pin.name}' de la categoría, esta acción no se puede deshacer. ¿Desea continuar?`,
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
        this.pinService.deletePin(pin.id).subscribe((response: CargarPins) => {
          if (response.total_pins >= 0) {
            this.notificationService.success('Marcador eliminado', `El marcador '${pin.name}' ha sido eliminado con éxito`);

            this.totalPins = response.total_pins;
            this.pinsCollection = response.pins;

            if (this.totalPins === 0) {
              this.notificationService.warning('Colección vacía', 'Has eliminado todos los marcadores de esta colección');
            }
          } else {
            this.notificationService.error('Error', `El marcador '${pin.name}' no ha podido ser eliminado, intentelo más tarde`);
          }
        });
      } else {
        this.notificationService.error('Error', `El marcador '${pin.name}' no ha podido ser eliminado, intentelo más tarde`);
      }
    });
  }
}
