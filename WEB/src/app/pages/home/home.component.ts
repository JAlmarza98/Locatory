import {Component, OnInit} from '@angular/core';
import {ConfirmComponent, EditPinsComponent} from 'src/app/components';
import {ICategoria, CargarPins, IPin, ConfirmModalData} from 'src/app/models';
import {PinService, NotificationService} from 'src/app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lat!: number;
  lng!: number;
  zoom = 2;

  sidebar!: boolean;

  currentCategory!: ICategoria;
  pinsCollection: IPin[] = [];
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

            let medLat = 0;
            let medLong = 0;
            this.pinsCollection.forEach((pin: IPin) => {
              medLat = medLat + parseFloat(pin.lat);
              medLong = medLong + parseFloat(pin.long);
            });

            this.lat = medLat/this.totalPins;
            this.lng = medLong/this.totalPins;
            this.zoom = 16;
          } else {
            this.notificationService.info(
                'No hay marcadores',
                'Actualmente no existen marcadores para esta colección.',
                3000,
            );
          }
        });
  }

  editPin(selectedPin: IPin): void {
    const modalDialog = this.modalService.open(
        EditPinsComponent,
        {
          backdrop: 'static',
          size: 'lg',
          keyboard: false,
          centered: true,
          scrollable: false,
        });

    modalDialog.componentInstance.pinToEdit = selectedPin;

    modalDialog.result.then((result: any) => {
      if (result as IPin) {
        this.pinService.editPin(selectedPin.id, result).subscribe((response: IPin) => {
          const pinIndex = this.pinsCollection.findIndex((pin) => pin.id === selectedPin.id);

          this.pinsCollection[pinIndex].description = response.description;
          this.pinsCollection[pinIndex].name = response.name;
          this.pinsCollection[pinIndex].finished = response.finished;

          this.notificationService.success('Marcador actualizado', 'El marcador ha sido actualizado correctamente');
        }, (err) => {
          this.notificationService.error(
              'Error al actualizar',
              'No se ha podido actualizar el marcador correctamente, por favor intentelo más tarde');
        });
      }
    });
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

  changePinStatus(pin: IPin): void {
    console.log(pin);

    this.pinService.changePinStatus(pin).subscribe( (response: IPin) => {
      if (response as IPin) {
        const pinIndex = this.pinsCollection.findIndex( (pin: IPin)=> pin.id === response.id);
        this.pinsCollection[pinIndex].finished = response.finished;
        if (response.finished) {
          this.notificationService.success(
              'Marcador Actualizado',
              `El marcador '${pin.name}' ha sido marcardo como terminado`);
        } else {
          this.notificationService.success(
              'Marcador Actualizado',
              `El marcador '${pin.name}' ha sido marcardo como no terminado`);
        }
      } else {
        this.notificationService.error(
            'Error',
            `El marcador '${pin.name}' no ha podido marcarse como terminado, intentelo más tarde`);
      }
    });
  }
}
