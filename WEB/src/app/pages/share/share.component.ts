import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.categoryService.getOneCategory(this.categoryId).subscribe((response: ICategoria) => {
      if (response as ICategoria) {
        this.sharedCategory = response;
        this.pinService.getPinsByCategory(this.categoryId).subscribe((response: any) => {
          this.pinsCollection = response.pins;
          this.totalPins = response.total_pins;
          this.showPinsControll();
        });
      } else {
        this.router.navigateByUrl('/home');
      }
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
