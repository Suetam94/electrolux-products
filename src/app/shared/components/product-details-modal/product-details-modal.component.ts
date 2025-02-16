import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { NumberToPtBrPipe } from '../../../pipes/number-to-pt-br.pipe';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ProductService } from '../../../services/product.service';
import { NewProductModalFormComponent } from '../new-product-modal-form/new-product-modal-form.component';
import { FeedbackModalModel } from '../../../models/feedback-modal.model';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { DatePipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
  imports: [
    NumberToPtBrPipe,
    ConfirmationModalComponent,
    NewProductModalFormComponent,
    FeedbackModalComponent,
    DatePipe,
    LoadingComponent,
  ],
})
export class ProductDetailsModalComponent {
  @Input() product!: Product;
  @Input() isDetailsModalOpen = false;
  @Output() close = new EventEmitter<void>();
  isConfirmationModalOpen = false;
  productToDelete: Product | null = null;
  isFormModalOpen = false;
  feedbackModalProperties: FeedbackModalModel = {
    isOpen: false,
    message: '',
    close: () => this.onFeedbackModalClose(),
    type: 'success',
  };

  isLoading = false;

  constructor(private productService: ProductService) {}

  openConfirmationModal(product: Product): void {
    this.productToDelete = product;
    this.isConfirmationModalOpen = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.productToDelete = null;
  }

  onFeedbackModalClose(): void {
    this.feedbackModalProperties.isOpen = false;
    this.isLoading = false;
    this.closeModal();
  }

  onSaveProduct(product: Product): void {
    this.isLoading = true;
    this.productService.updateProduct(product).subscribe((status) => {
      if (status === 'success') {
        this.feedbackModalProperties = {
          isOpen: true,
          type: 'success',
          message: `Produto ${product.name} atualizado com sucesso!`,
          close: () => {
            this.onFeedbackModalClose();
          },
        };
        this.close.emit();
      } else {
        this.feedbackModalProperties = {
          isOpen: true,
          type: 'error',
          message: `Erro ao tentar atualizar o produto ${product.name}.`,
          close: () => {
            this.onFeedbackModalClose();
          },
        };
        this.close.emit();
      }
    });
    this.isLoading = false;
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
    this.isLoading = true;
    this.isDetailsModalOpen = false;
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.feedbackModalProperties = {
            isOpen: true,
            type: 'success',
            message: `Produto ${this.product.name} deletado com sucesso!`,
            close: () => {
              this.onFeedbackModalClose();
            },
          };
          this.close.emit();
        },
        error: (err) => {
          console.error(err);
          this.feedbackModalProperties = {
            isOpen: true,
            type: 'error',
            message: `Erro ao tentar deletar o produto ${this.product.name}.`,
            close: () => {
              this.onFeedbackModalClose();
            },
          };
          this.close.emit();
        },
      });
    }
    this.closeConfirmationModal();
    this.isLoading = false;
  }
}
