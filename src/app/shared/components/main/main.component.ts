import { Component } from '@angular/core';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-main',
  imports: [
    TableComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
