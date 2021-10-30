import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';
import {ICategoria, IPin} from 'src/app/models';
import {CategoryService, NotificationService, PinService} from 'src/app/services';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
  lat!: number;
  lng!: number;
  zoom = 2;

  categoryId!: string;
  sharedCategory!: ICategoria;
  pinsCollection!: IPin[];
  totalPins!: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private pinService: PinService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');

    forkJoin({
      getCategoryData: this.categoryService.getOneCategory(this.categoryId),
      getPinList: this.pinService.getPinsByCategory(this.categoryId),
    }).subscribe(({getCategoryData, getPinList}) => {
      this.sharedCategory = getCategoryData;
      this.pinsCollection = getPinList.pins;
      this.totalPins = getPinList.total_pins;

      this.showPinsControll();
    });
  }

  showPinsControll(): void {
    if (this.totalPins === 0) {
      this.notificationService.info(
          'No hay marcadores',
          'Actualmente no existen marcadores para esta colección.',
          3000,
      );
    } else {
      this.lat = parseFloat(this.pinsCollection[0].lat);
      this.lng = parseFloat(this.pinsCollection[0].long);
      this.zoom = 16;
    }
  }
}
