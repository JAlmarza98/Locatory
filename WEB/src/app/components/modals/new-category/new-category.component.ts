import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  newCategoryForm!: FormGroup;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      color: ['', [Validators.required]],
    });
  }

  close(): void {
    this.activeModal.close();
  }

  createCategory(): void {
    this.activeModal.close(this.newCategoryForm.value);
  }
}
