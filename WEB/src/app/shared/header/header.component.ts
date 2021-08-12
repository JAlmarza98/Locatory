import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output()
  openCategory = new EventEmitter<boolean>();

  open = false;

  constructor() {}

  ngOnInit(): void {}

  changeState() {
    this.open = !this.open;

    this.openCategory.emit(this.open);
  }
}
