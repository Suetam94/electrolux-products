import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
  imports: [
    DecimalPipe
  ]
})
export class ProductDetailsModalComponent {
  @Input() product: any | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
