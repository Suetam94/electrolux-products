import { Component, OnInit } from '@angular/core';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { NumberToPtBrPipe } from '../../../pipes/number-to-pt-br.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [ProductDetailsModalComponent, NumberToPtBrPipe],
})
export class TableComponent implements OnInit {
  isModalOpen = false;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  items: Product[] = [];

  ngOnInit(): void {
    this.productService.products$.subscribe({
      next: (products: Product[]) => {
        this.items = products;
      },
      error: (error) => console.error(error),
    });

    this.productService.loadProducts();
  }

  openModal(product: Product): void {
    console.log(product);
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
}
