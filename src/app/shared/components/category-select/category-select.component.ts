import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  imports: [FormsModule],
})
export class CategorySelectComponent implements OnInit {
  @Input() selectedCategoryName: string | null = null;
  @Output() categoryChange = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.selectedCategoryName && this.categories.length > 0) {
      this.selectedCategoryName = '';
    }
  }

  categories: Category[] = [
    { id: 1, name: 'Eletrodomésticos' },
    { id: 2, name: 'Eletroportáteis' },
    { id: 3, name: 'Utilidades domésticas' },
    { id: 4, name: 'Peças e Acessórios' },
  ];

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }
}
