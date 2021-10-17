import {Component, Input, OnInit} from '@angular/core';
import {ICategoria} from 'src/app/models';
import {environment} from 'src/environments/environment';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-modal-container',
  templateUrl: './share-modal-container.component.html',
  styleUrls: ['./share-modal-container.component.css'],
})
export class ShareModalContainerComponent implements OnInit {
  @Input() category: ICategoria;

  shareURL!: string;
  url = environment.base_url;
  urlLink = false;

  constructor( private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.shareURL = `${this.url}/share/${this.category.id}`;
  }

  public shareByURL(event: boolean): void {
    this.urlLink = event;
  }

  public close(): void {
    this.activeModal.close();
  }
}
