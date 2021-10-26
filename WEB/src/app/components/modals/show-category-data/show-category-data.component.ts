import {Component, Input, OnInit} from '@angular/core';
import {CargarPins, ICategoria, IPin, ShowDataModalActions, newPinForm, ConfirmModalData} from 'src/app/models';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PinService, NotificationService} from 'src/app/services';
import {ConfirmComponent, EditPinsComponent, NewPinComponent, ShareModalContainerComponent} from 'src/app/components';

@Component({
  selector: 'app-show-category-data',
  templateUrl: './show-category-data.component.html',
  styleUrls: ['./show-category-data.component.css'],
})
export class ShowCategoryDataComponent implements OnInit {
  @Input() category: ICategoria;
  pins: IPin[] = [];

  actions!: ShowDataModalActions;

  constructor(
    private activeModal: NgbActiveModal,
    private pinService: PinService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.actions = {
      id: this.category.id,
      action: {
        deleteCategory: false,
        showPins: false,
        editCategory: false,
      },
    };

    this.pinService
        .getPinsByCategory(this.category.id)
        .subscribe((response: CargarPins) => {
          this.pins = response.pins;
        });
  }

  public close(): void {
    this.activeModal.close();
  }

  public editCategory(): void {
    this.actions.action.editCategory = true;
    this.activeModal.close(this.actions);
  }

  public showPins(): void {
    this.actions.action.showPins = true;
    this.activeModal.close(this.actions);
  }

  public deleteCategory(): void {
    const deleteCategoryData: ConfirmModalData = {
      actionBtn: 'Borrar',
      title: `Eliminar categoría '${this.category.name}'`,
      icon: 'far fa-trash-alt fa-9x',
      text: `Se va a eliminar la colección '${this.category.name}', esta acción no se puede deshacer. ¿Desea continuar?`,
    };

    const modalDialog = this.modalService.open( ConfirmComponent,
        {
          backdrop: 'static',
          size: 'lg',
          keyboard: false,
          centered: true,
          scrollable: false,
        });

    modalDialog.componentInstance.confirmModalData = deleteCategoryData;

    modalDialog.result.then((result: boolean) => {
      if (result) {
        this.actions.action.deleteCategory = true;
        this.activeModal.close(this.actions);
      }
    });
  }

  public addPin(): void {
    const modalDialog = this.modalService.open(NewPinComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
      scrollable: false,
    });

    modalDialog.componentInstance.category = this.category;
    modalDialog.result.then((result: newPinForm) => {
      if (result.name) {
        this.pinService.createNewPin(result).subscribe( (response: CargarPins) => {
          this.pins = response.pins;
          this.notificationService.success(
              'Marcador Añadido',
              'El marcador se ha añadido con existo a la colección');
        });
      } else {
        this.notificationService.error(
            'Error',
            'El marcador no se ha podido añadir a la colección');
      }
    });
  }

  public shareCategory(): void {
    const modalDialog = this.modalService.open(ShareModalContainerComponent, {
      backdrop: 'static',
      size: 'sm',
      keyboard: false,
      centered: true,
      scrollable: false,
    });

    modalDialog.componentInstance.category = this.category;
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
            this.pins = response.pins;
          } else {
            this.notificationService.error('Error', `El marcador '${pin.name}' no ha podido ser eliminado, intentelo más tarde`);
          }
        });
      } else {
        this.notificationService.error('Error', `El marcador '${pin.name}' no ha podido ser eliminado, intentelo más tarde`);
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
          const pinIndex = this.pins.findIndex((pin) => pin.id === selectedPin.id);

          this.pins[pinIndex].description = response.description;
          this.pins[pinIndex].name = response.name;
          this.pins[pinIndex].finished = response.finished;

          this.notificationService.success('Marcador actualizado', 'El marcador ha sido actualizado correctamente');
          console.log(this.pins);
        }, (err) => {
          this.notificationService.error(
              'Error al actualizar',
              'No se ha podido actualizar el marcador correctamente, por favor intentelo más tarde');
        });
      }
    });
  }
}
