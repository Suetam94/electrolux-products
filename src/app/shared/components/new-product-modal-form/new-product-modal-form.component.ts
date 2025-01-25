import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import {CategorySelectComponent} from "../category-select/category-select.component";

@Component({
  selector: 'app-new-product-modal-form',
  imports: [ReactiveFormsModule, CategorySelectComponent],
  templateUrl: './new-product-modal-form.component.html',
  styleUrls: ['./new-product-modal-form.component.scss'],
})
export class NewProductModalFormComponent {
  isModalOpen = false;
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
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
      this.productService.createProduct(product).subscribe({
        next: (product: Product) => {
          console.log('Product created', product);
          this.productForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log('Created Product:', product);
      this.closeModal();
    } else {
      this.markFormFieldsAsTouched(this.productForm);
      console.log('Form is invalid');
    }
  }

  private markFormFieldsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
