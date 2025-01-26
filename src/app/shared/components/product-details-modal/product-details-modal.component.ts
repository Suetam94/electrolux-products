import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { NumberToPtBrPipe } from '../../../pipes/number-to-pt-br.pipe';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ProductService } from '../../../services/product.service';
import { NewProductModalFormComponent } from '../new-product-modal-form/new-product-modal-form.component';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
  imports: [NumberToPtBrPipe, ConfirmationModalComponent, NewProductModalFormComponent],
})
export class ProductDetailsModalComponent {
  @Input() product!: Product;
  @Input() isDetailsModalOpen = false;
  @Output() close = new EventEmitter<void>();
  isConfirmationModalOpen = false;
  productToDelete: Product | null = null;
  isFormModalOpen = false;

  constructor(private productService: ProductService) {}

  openConfirmationModal(product: Product): void {
    this.productToDelete = product;
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.productToDelete = null;
  }

  onSaveProduct(product: Product): void {
    this.productService.updateProduct(product);
    this.isFormModalOpen = false;
  }

  closeModal(): void {
    this.close.emit();
  }

  updateProduct(): void {
    this.isDetailsModalOpen = false;
    this.isFormModalOpen = true;
  }

  closeFormModal(): void {
    this.isFormModalOpen = false;
  }

  deleteProduct(): void {
    this.isDetailsModalOpen = false;
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          console.log('Deleting product');
        },
        error: (error) => console.log(error),
      });
      console.log(`Produto excluído: ${this.productToDelete.name}`);
    }
    this.closeConfirmationModal();
  }
}
