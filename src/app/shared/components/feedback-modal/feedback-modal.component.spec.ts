import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeedbackModalComponent } from './feedback-modal.component';

describe('FeedbackModalComponent', () => {
  let component: FeedbackModalComponent;
  let fixture: ComponentFixture<FeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackModalComponent], // Inclui o componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the modal when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.fixed'));
    expect(modalElement).toBeNull();
  });

  it('should render the modal when isOpen is true', () => {
    component.isOpen = true;
    component.message = 'Test Message';
    component.type = 'success';
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.fixed'));
    expect(modalElement).toBeTruthy();
    expect(modalElement.nativeElement.textContent).toContain('Sucesso!');
    expect(modalElement.nativeElement.textContent).toContain('Test Message');
  });

  it('should render error styles and text when type is "error"', () => {
    component.isOpen = true;
    component.message = 'Error Message';
    component.type = 'error';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Erro!');
    expect(titleElement.nativeElement.classList).toContain('text-red-500');
  });

  it('should call closeModal when the button is clicked', () => {
    spyOn(component, 'closeModal');
    component.isOpen = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('button')).nativeElement;
    closeButton.click();

    expect(component.closeModal).toHaveBeenCalled();
  });
});
