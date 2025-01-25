import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent {
  @Input() selectedCategoryName: string | null = null;
  @Output() categoryChange = new EventEmitter<string>();

  categories: Category[] = [
    { id: 1, name: 'Eletrodomésticos' },
    { id: 2, name: 'Eletroportáteis' },
    { id: 3, name: 'Utilidades domésticas' },
    { id: 4, name: 'Peças e Acessórios' },
  ];

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.categoryChange.emit(target.value);
  }
}
