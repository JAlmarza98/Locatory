import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-share-by-url',
  templateUrl: './share-by-url.component.html',
  styleUrls: ['./share-by-url.component.css'],
})
export class ShareByUrlComponent implements OnInit {
  @Input() shareURL: string

  constructor() { }

  ngOnInit(): void {
  }
}
