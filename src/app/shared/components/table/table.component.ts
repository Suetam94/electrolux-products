import { Component } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {ProductDetailsModalComponent} from "../product-details-modal/product-details-modal.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    DecimalPipe,
    ProductDetailsModalComponent
  ]
})
export class TableComponent {
  isModalOpen = false;
  selectedProduct: any;

  items = [
    { id: 1,name: 'Aspirador de Pó', price: 1329.05, category: 'Eletrodomésticos', description: 'Isso é um teste de descrição' },
    { id: 2,name: 'Fritadeira Elétrica', price: 899.99, category: 'Cozinha', description: 'Isso é um teste de descrição' },
    { id: 3,name: 'Ventilador de Mesa', price: 349.9, category: 'Climatização', description: 'Isso é um teste de descrição' },
  ];

  openModal(product: any): void {
    console.log(product)
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }
}
