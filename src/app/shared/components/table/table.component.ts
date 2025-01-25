import {Component, OnInit} from '@angular/core';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { Product } from '../../../models/product.model';
import {ProductService} from "../../../services/product.service";
import {NumberToPtBrPipe} from "../../../pipes/number-to-pt-br.pipe";

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

  items: Product[] = [
    {
      id: 1,
      name: 'Aspirador de Pó',
      price: 1329.05,
      category: 'Eletrodomésticos'
    },
    {
      id: 2,
      name: 'Fritadeira Elétrica',
      price: 899.99,
      category: 'Cozinha'
    },
    {
      id: 3,
      name: 'Ventilador de Mesa',
      price: 349.9,
      category: 'Climatização'
    },
  ];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        if (data.length > 0) {
          this.items = data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  protected readonly Number = Number;
}
