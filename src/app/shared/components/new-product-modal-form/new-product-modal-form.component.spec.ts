import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductModalFormComponent } from './new-product-modal-form.component';

describe('NewProductModalFormComponent', () => {
  let component: NewProductModalFormComponent;
  let fixture: ComponentFixture<NewProductModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
