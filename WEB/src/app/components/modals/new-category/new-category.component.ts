import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  public newCategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    color: ['', [Validators.required]],
  });

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close();
  }

  createCategory() {
    this.activeModal.close(this.newCategoryForm.value);
  }
}
