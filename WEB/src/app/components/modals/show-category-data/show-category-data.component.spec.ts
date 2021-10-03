import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoryDataComponent } from './show-category-data.component';

describe('ShowCategoryDataComponent', () => {
  let component: ShowCategoryDataComponent;
  let fixture: ComponentFixture<ShowCategoryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategoryDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategoryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
