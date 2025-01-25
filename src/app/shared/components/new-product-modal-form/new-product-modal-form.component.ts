import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-new-product-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product-modal-form.component.html',
  styleUrls: ['./new-product-modal-form.component.scss'],
})
export class NewProductModalFormComponent {
  isModalOpen = false;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.productForm.reset();
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      console.log('Created Product:', product);
      this.closeModal();
    } else {
      console.log('Form is invalid');
    }
  }
}
