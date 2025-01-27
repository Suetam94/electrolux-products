import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { NewProductModalFormComponent } from '../new-product-modal-form/new-product-modal-form.component';
import { TableComponent } from '../table/table.component';
import {By} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        NewProductModalFormComponent,
        TableComponent,
      ],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render NewProductModalFormComponent', () => {
    const modalFormElement = fixture.debugElement.query(By.css('app-new-product-modal-form'));
    expect(modalFormElement).toBeTruthy();
  });

  it('should render TableComponent', () => {
    const tableElement = fixture.debugElement.query(By.css('app-table'));
    expect(tableElement).toBeTruthy();
  });
});
