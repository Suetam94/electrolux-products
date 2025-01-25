import {Component, OnInit} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { Product } from '../../../models/product.model';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [DecimalPipe, ProductDetailsModalComponent],
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
      category: 'Eletrodomésticos',
      description: 'Isso é um teste de descrição',
    },
    {
      id: 2,
      name: 'Fritadeira Elétrica',
      price: 899.99,
      category: 'Cozinha',
      description: 'Isso é um teste de descrição',
    },
    {
      id: 3,
      name: 'Ventilador de Mesa',
      price: 349.9,
      category: 'Climatização',
      description: 'Isso é um teste de descrição',
    },
  ];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        if (data.length > 0) {
          this.items = data;
        }
      },
      error: error => { console.log(error); },
    })
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
