import {Component, OnInit} from '@angular/core';
import {ICategoria, CargarPins, Pin} from 'src/app/models';
import {PinService} from 'src/app/services';
import {NotificationService} from 'src/app/services';

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
  ) {}

  ngOnInit(): void {}

  showSidebar(event: boolean): void {
    this.sidebar = event;
  }

  newPin(event:any) {
    const coords: { lat: number, lng: number } = event.coords;
    console.log(coords);

    const newPin = new Pin('', {_id: '', name: ''}, true, coords.lat, coords.lng, false, '' );

    this.pinsCollection.push(newPin);
    console.log(this.pinsCollection);
  }

  showPinsCollection(category: ICategoria): void {
    this.currentCategory = category;

    this.pinService
        .getPinsByCategory(category.id)
        .subscribe((response: CargarPins) => {
          if (response.total_pins !== 0) {
            console.log(response);
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
}
