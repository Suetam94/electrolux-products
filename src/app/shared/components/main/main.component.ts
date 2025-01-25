import { Component } from '@angular/core';
import {TableComponent} from '../table/table.component';
import {NewProductModalFormComponent} from '../new-product-modal-form/new-product-modal-form.component';

@Component({
  selector: 'app-main',
  imports: [
    TableComponent,
    NewProductModalFormComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
