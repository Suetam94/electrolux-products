import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent], // Inclui o componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, message, and button texts correctly', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    component.cancelButtonText = 'Cancel';
    component.confirmButtonText = 'Confirm';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    const confirmButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;

    expect(titleElement.textContent.trim()).toBe('Test Title');
    expect(messageElement.textContent.trim()).toBe('Test Message');
    expect(cancelButton.textContent.trim()).toBe('Cancel');
    expect(confirmButton.textContent.trim()).toBe('Confirm');
  });

  it('should call onDismiss when cancel button is clicked', () => {
    spyOn(component, 'onDismiss');
    component.cancelButtonText = 'Cancel';
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    cancelButton.click();

    expect(component.onDismiss).toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    spyOn(component, 'onConfirm');
    component.confirmButtonText = 'Confirm';
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    confirmButton.click();

    expect(component.onConfirm).toHaveBeenCalled();
  });
});
