import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categoria} from 'src/app/models';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  @Input() category: Categoria;

  updateCategoryForm!: FormGroup;

  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateCategoryForm = this.fb.group({
      name: [this.category.name, [Validators.required]],
      description: [this.category.description],
      color: [this.category.color, [Validators.required]],
    });
  }

  close(): void {
    this.activeModal.close();
  }

  updateCategoryData(): void {
    this.activeModal.close(this.updateCategoryForm.value);
  }
}
