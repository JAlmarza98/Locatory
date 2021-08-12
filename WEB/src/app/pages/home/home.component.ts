import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  lat = 40.26923811554885;
  lng = -3.921616256343138;
  sidebar!: boolean;

  constructor() {}

  ngOnInit(): void {}

  showSidebar(event: boolean) {
    this.sidebar = event;
  }
}
