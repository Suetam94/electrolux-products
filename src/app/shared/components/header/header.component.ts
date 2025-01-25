import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchTerm = '';
  event: Event | null = null;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  onInputChange(event: Event | null) {
    this.event = event;
    const target = event?.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.productService.filterProductsByName(this.searchTerm);
  }
}
