import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategoria, newPinForm} from 'src/app/models';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-pin',
  templateUrl: './new-pin.component.html',
  styleUrls: ['./new-pin.component.css'],
})
export class NewPinComponent implements OnInit {
  @Input() category: ICategoria;

  lat = 40.26923811554885;
  lng = -3.921616256343138;

  coords = {
    lat: null,
    lng: null,
  }

  public newPinForm!: FormGroup;

  finalNewPinData: newPinForm = {
    name: '',
    category: '',
    lat: '',
    long: '',
  };

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newPinForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });

    this.finalNewPinData.category = this.category.id;
  }

  close(): void {
    this.activeModal.close();
  }

  createPin(): void {
    this.finalNewPinData.name = this.newPinForm.value.name;
    if (this.newPinForm.value.description !== '') {
      this.finalNewPinData.description = this.newPinForm.value.description;
    }

    // TODO: capar el envio de formulario cuando no sea valido
    this.activeModal.close(this.finalNewPinData);
  }

  setPin(event: NewPinEvent):void {
    this.coords = event.coords;

    this.finalNewPinData.lat = event.coords.lat.toString();
    this.finalNewPinData.long = event.coords.lng.toString();
  }
}

interface NewPinEvent {
  coords:{
    lat: number
    lng: number
  },
  placeId: string | number | undefined,
}
