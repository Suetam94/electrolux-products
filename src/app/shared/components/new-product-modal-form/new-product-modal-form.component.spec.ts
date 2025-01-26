import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NewProductModalFormComponent } from './new-product-modal-form.component';
import { CategorySelectComponent } from '../category-select/category-select.component';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import {provideHttpClient} from '@angular/common/http';

describe('NewProductModalFormComponent', () => {
  let component: NewProductModalFormComponent;
  let fixture: ComponentFixture<NewProductModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewProductModalFormComponent,
        ReactiveFormsModule,
        CategorySelectComponent,
        FeedbackModalComponent,
      ],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Criar Novo Produto" button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Criar Novo Produto');
  });

  it('should open the modal when "openModal" is called', () => {
    component.openModal();
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.fixed'));
    expect(modalElement).toBeTruthy();
  });

  it('should validate the form fields correctly', () => {
    component.openModal();
    fixture.detectChanges();

    const form = component.productForm;
    const nameInput = form.get('name');
    const categoryInput = form.get('category');
    const priceInput = form.get('price');

    // Campos vazios são inválidos
    expect(form.valid).toBeFalsy();

    // Preenchendo os campos com valores válidos
    nameInput?.setValue('Produto Teste');
    categoryInput?.setValue('Categoria Teste');
    priceInput?.setValue(100);

    expect(form.valid).toBeTruthy();
  });

  it('should call "submitForm" when the form is submitted', () => {
    spyOn(component, 'submitForm');
    component.openModal();
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    expect(component.submitForm).toHaveBeenCalled();
  });

  it('should render the feedback modal with correct properties', () => {
    component.feedbackModalProperties = {
      isOpen: true,
      message: 'Produto criado com sucesso!',
      type: 'success',
      close: () => (component.feedbackModalProperties.isOpen = false),
    };
    fixture.detectChanges();

    const feedbackModal = fixture.debugElement.query(By.css('app-feedback-modal'));
    expect(feedbackModal).toBeTruthy();
    expect(feedbackModal.componentInstance.isOpen).toBeTrue();
    expect(feedbackModal.componentInstance.message).toBe('Produto criado com sucesso!');
    expect(feedbackModal.componentInstance.type).toBe('success');
  });
});
