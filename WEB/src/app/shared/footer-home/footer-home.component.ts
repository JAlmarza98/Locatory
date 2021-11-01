import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer-home',
  templateUrl: './footer-home.component.html',
  styleUrls: ['./footer-home.component.css'],
})
export class FooterHomeComponent implements OnInit {
  year: number;

  constructor() { }

  ngOnInit(): void {
    // const date = new Date();
    // this.year = date.getFullYear();
    this.year = 2021;
  }
}
