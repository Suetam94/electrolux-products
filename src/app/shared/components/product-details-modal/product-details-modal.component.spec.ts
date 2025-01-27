import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductDetailsModalComponent } from './product-details-modal.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NewProductModalFormComponent } from '../new-product-modal-form/new-product-modal-form.component';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import {provideHttpClient} from '@angular/common/http';

describe('ProductDetailsModalComponent', () => {
  let component: ProductDetailsModalComponent;
  let fixture: ComponentFixture<ProductDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductDetailsModalComponent,
        ConfirmationModalComponent,
        NewProductModalFormComponent,
        FeedbackModalComponent,
      ],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the details modal when isDetailsModalOpen is true', () => {
    component.isDetailsModalOpen = true;
    component.product = { id: 1, name: 'Produto Teste', category: 'Categoria Teste', price: 100, createdAt: new Date().toISOString() };
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.fixed'));
    expect(modalElement).toBeTruthy();
    expect(modalElement.nativeElement.textContent).toContain('Produto Teste');
    expect(modalElement.nativeElement.textContent).toContain('Categoria Teste');
    expect(modalElement.nativeElement.textContent).toContain('R$ 100,00');
  });

  it('should render the confirmation modal with correct properties when isConfirmationModalOpen is true', () => {
    component.isConfirmationModalOpen = true;
    fixture.detectChanges();

    const confirmationModal = fixture.debugElement.query(By.css('app-confirmation-modal'));
    expect(confirmationModal).toBeTruthy();
    expect(confirmationModal.componentInstance.title).toBe('Excluir Produto');
    expect(confirmationModal.componentInstance.message).toBe('Tem certeza que deseja excluir este produto?');
  });
});
