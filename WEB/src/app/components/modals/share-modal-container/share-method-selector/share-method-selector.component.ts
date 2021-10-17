import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-share-method-selector',
  templateUrl: './share-method-selector.component.html',
  styleUrls: ['./share-method-selector.component.css'],
})
export class ShareMethodSelectorComponent implements OnInit {
  @Output() url = new EventEmitter<boolean>();
  @Input() shareURL: string

  shareMessageDefault: string = 'Mira que sitios!!!'
  twitterShareURL!: string;
  whatsAppShareURL!: string;
  facebookShareURL!: string;

  constructor() { }

  ngOnInit(): void {
    const encodeMessage = encodeURI(`${this.shareMessageDefault} ${this.shareURL}`);
    // const encodeURL = encodeURI(this.shareURL);

    this.twitterShareURL = `http://twitter.com/share?text=${this.shareMessageDefault}&url=${this.shareURL}`;
    this.whatsAppShareURL = `https://wa.me/?text=${encodeMessage}`;
    this.facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${this.shareURL}`;
  }

  shareByURL(): void {
    this.url.emit(true);
  }
}
