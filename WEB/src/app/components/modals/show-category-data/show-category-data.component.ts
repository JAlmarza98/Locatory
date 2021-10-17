import {Component, Input, OnInit} from '@angular/core';
import {CargarPins, ICategoria, IPin, ShowDataModalActions, newPinForm} from 'src/app/models';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PinService, NotificationService} from 'src/app/services';
import {NewPinComponent, ShareModalContainerComponent} from 'src/app/components';

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
    this.actions.action.deleteCategory = true;
    this.activeModal.close(this.actions);
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
}
