import { Component, OnInit } from '@angular/core';
import { ICategoria, IPin, CargarPins } from 'src/app/models';
import { PinService } from 'src/app/services';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lat = 40.26923811554885;
  lng = -3.921616256343138;
  sidebar!: boolean;

  currentCategory!: ICategoria;
  pinsCollection!: IPin[];
  total_pins!: number;

  constructor(
    private pinService: PinService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  showSidebar(event: boolean) {
    this.sidebar = event;
  }

  showPinsCollection(category: ICategoria) {
    this.currentCategory = category;

    this.pinService
      .getPinsByCategory(category.id)
      .subscribe((response: CargarPins) => {
        if (response.total_pins !== 0) {
          console.log(response);
          this.total_pins = response.total_pins;
          this.pinsCollection = response.pins;
        } else {
          this.notificationService.error(
            'No hay marcadores',
            'Actualmente no existen marcadores para esta colección.',
            3000
          );
        }
      });
  }
}
