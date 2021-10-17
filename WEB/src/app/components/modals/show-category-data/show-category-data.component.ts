import {Component, Input, OnInit} from '@angular/core';
import {CargarPins, ICategoria, IPin, ShowDataModalActions} from 'src/app/models';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PinService} from 'src/app/services';
import {ShareModalContainerComponent} from 'src/app/components/index';

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
        .subscribe((pins: CargarPins) => this.pins = pins.pins);
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
