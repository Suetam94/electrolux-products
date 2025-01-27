import { Component, OnInit } from '@angular/core';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { NumberToPtBrPipe } from '../../../pipes/number-to-pt-br.pipe';
import { CeilPipe } from '../../../pipes/ceil.pipe';
import { NoDataComponent } from '../no-data/no-data.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [ProductDetailsModalComponent, NumberToPtBrPipe, CeilPipe, NoDataComponent, LoadingComponent],
})
export class TableComponent implements OnInit {
  isModalOpen = false;
  selectedProduct: Product | null = null;
  items: Product[] = [];
  displayedItems: Product[] = [];
  currentPage = 1;
  pageSize = 10;
  totalProducts = 0;
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.products$.subscribe({
      next: (products: Product[]) => {
        this.items = products;
        this.totalProducts = products.length;
        this.updateDisplayedItems();
      },
      error: (error) => console.error(error),
    });

    this.productService.loadProducts();
    this.isLoading = false;
  }

  updateDisplayedItems(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.items.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalProducts) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
}
