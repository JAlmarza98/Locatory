import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPinsComponent } from './edit-pins.component';

describe('EditPinsComponent', () => {
  let component: EditPinsComponent;
  let fixture: ComponentFixture<EditPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
