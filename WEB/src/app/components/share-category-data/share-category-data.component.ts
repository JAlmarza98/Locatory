import {Component, Input, OnInit} from '@angular/core';
import {ICategoria} from 'src/app/models';

@Component({
  selector: 'app-share-category-data',
  templateUrl: './share-category-data.component.html',
  styleUrls: ['./share-category-data.component.css'],
})
export class ShareCategoryDataComponent implements OnInit {
  @Input() category!: ICategoria;
  @Input() totalPins!: number;

  constructor() { }

  ngOnInit(): void {
  }
}
