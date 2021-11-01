import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeoLocationResponse, ICategoria, newPinForm} from 'src/app/models';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GeoLocationService, NotificationService} from 'src/app/services';

@Component({
  selector: 'app-new-pin',
  templateUrl: './new-pin.component.html',
  styleUrls: ['./new-pin.component.css'],
})
export class NewPinComponent implements OnInit {
  @Input() category: ICategoria;

  zoom = 2;
  coords = {
    lat: null,
    lng: null,
  }

  search!:string;
  public newPinForm!: FormGroup;

  finalNewPinData: newPinForm = {
    name: '',
    category: '',
    lat: '',
    long: '',
  };

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private geoLocationService: GeoLocationService) { }

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

    this.activeModal.close(this.finalNewPinData);
  }

  setPin(event: NewPinEvent):void {
    this.coords = event.coords;

    this.finalNewPinData.lat = event.coords.lat.toString();
    this.finalNewPinData.long = event.coords.lng.toString();
  }

  searchGeoLocation(): void {
    this.geoLocationService.searchDirection(this.search).subscribe((response: GeoLocationResponse) => {
      if (response.status === 'OK') {
        this.coords = response.results[0].geometry.location;
        this.finalNewPinData.lat = this.coords.lat.toString();
        this.finalNewPinData.long = this.coords.lng.toString();
        this.zoom = 16;
      } else {
        this.notificationService.error(
            'Error en API',
            'Actualmente la API encargade de la geolocalización no esta funcionando correctamente');
      }
    });
  }
}

interface NewPinEvent {
  coords:{
    lat: number
    lng: number
  },
  placeId: string | number | undefined,
}
