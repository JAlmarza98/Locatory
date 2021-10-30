import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  year: number;

  constructor() {}

  ngOnInit(): void {
    // const date = new Date();
    // this.year = date.getFullYear();
    this.year = 2021;
  }
}
