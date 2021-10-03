import { Component, Input, OnInit } from '@angular/core';
import { CargarPins, ICategoria, IPin } from 'src/app/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PinService } from 'src/app/services/pin.service';

@Component({
  selector: 'app-show-category-data',
  templateUrl: './show-category-data.component.html',
  styleUrls: ['./show-category-data.component.css'],
})
export class ShowCategoryDataComponent implements OnInit {
  @Input() category: ICategoria;

  pins!: IPin[];

  constructor(
    private activeModal: NgbActiveModal,
    private pinService: PinService
  ) {}

  ngOnInit(): void {
    this.pinService
      .getPinsByCategory(this.category.id)
      .subscribe((pins: CargarPins) => {
        this.pins = pins.pins;
      });
  }

  close() {
    this.activeModal.close();
  }

  editCategory(): void {}
}
