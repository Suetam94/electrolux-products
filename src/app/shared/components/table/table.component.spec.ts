import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { provideHttpClient } from '@angular/common/http';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, ProductDetailsModalComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call openModal when "Detalhes" button is clicked', () => {
    spyOn(component, 'openModal');
    component.displayedItems = [
      { id: 1, name: 'Produto Teste', category: 'Categoria Teste', price: 100, createdAt: new Date().toISOString() },
    ];
    fixture.detectChanges();

    const detailsButton = fixture.debugElement.query(By.css('button')).nativeElement;
    detailsButton.click();

    expect(component.openModal).toHaveBeenCalledWith(component.displayedItems[0]);
  });

  it('should render the product details modal when isModalOpen is true', () => {
    component.isModalOpen = true;
    component.selectedProduct = {
      id: 1,
      name: 'Produto Teste',
      category: 'Categoria Teste',
      price: 100,
      createdAt: new Date().toISOString(),
    };
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('app-product-details-modal'));
    expect(modal).toBeTruthy();
    expect(modal.componentInstance.isDetailsModalOpen).toBeTrue();
    expect(modal.componentInstance.product).toEqual(component.selectedProduct);
  });
});
