import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CategorySelectComponent } from '../category-select/category-select.component';

@Component({
  selector: 'app-new-product-modal-form',
  imports: [ReactiveFormsModule, CategorySelectComponent],
  templateUrl: './new-product-modal-form.component.html',
  styleUrls: ['./new-product-modal-form.component.scss'],
})
export class NewProductModalFormComponent implements OnChanges {
  @Input() isModalOpen = false;
  @Input() product: Product | null = null;
  @Input() editMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product && this.editMode) {
      this.productForm.patchValue(this.product);
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.close.emit();
    this.isModalOpen = false;
    if (!this.editMode) {
      this.productForm.reset();
    }
  }

  submitForm(): void {
    if (this.productForm.valid) {
      if (this.editMode) {
        const updateProduct = { ...this.product, ...this.productForm.value };
        this.save.emit(updateProduct);
        return;
      }

      this.createProduct();
    } else {
      this.markFormFieldsAsTouched(this.productForm);
      console.log('Form is invalid');
    }
  }

  createProduct(): void {
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
