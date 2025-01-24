import { Component } from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    DecimalPipe
  ]
})
export class TableComponent {
  items = [
    { id: 1,nome: 'Aspirador de Pó', preco: 1329.05, categoria: 'Eletrodomésticos' },
    { id: 2,nome: 'Fritadeira Elétrica', preco: 899.99, categoria: 'Cozinha' },
    { id: 3,nome: 'Ventilador de Mesa', preco: 349.9, categoria: 'Climatização' },
  ];

  details(item: any) {
    console.log('Detalhes do item:', item);
  }
}
