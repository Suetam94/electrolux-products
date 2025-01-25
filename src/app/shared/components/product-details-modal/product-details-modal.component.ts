import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import {NumberToPtBrPipe} from '../../../pipes/number-to-pt-br.pipe';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
  imports: [ NumberToPtBrPipe],
})
export class ProductDetailsModalComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
