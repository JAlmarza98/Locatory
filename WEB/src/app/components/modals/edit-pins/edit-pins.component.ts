import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IPin} from 'src/app/models';

@Component({
  selector: 'app-edit-pins',
  templateUrl: './edit-pins.component.html',
  styleUrls: ['./edit-pins.component.css'],
})
export class EditPinsComponent implements OnInit {
  @Input() pinToEdit: IPin;
  updatePinForm!: FormGroup;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updatePinForm = this.fb.group({
      name: [this.pinToEdit.name, [Validators.required]],
      lat: new FormControl({value: this.pinToEdit.lat, disabled: true}, Validators.required),
      long: new FormControl({value: this.pinToEdit.long, disabled: true}, Validators.required),
      finished: [this.pinToEdit.finished, [Validators.required]],
      description: [this.pinToEdit.description, [Validators.required]],
    });
  }

  close(): void {
    this.activeModal.close();
  }

  updatePinData(): void {
    this.activeModal.close(this.updatePinForm.value);
  }
}
