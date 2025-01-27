import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o spinner quando isLoading for true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();
  });

  it('não deve exibir o spinner quando isLoading for false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeNull();
  });

  it('deve aplicar o tamanho correto ao spinner', () => {
    component.isLoading = true;
    component.size = 60; // Tamanho do spinner
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    const styles = spinner.nativeElement.style;

    expect(styles.width).toBe('60px');
    expect(styles.height).toBe('60px');
  });

  it('deve exibir a mensagem quando fornecida', () => {
    component.isLoading = true;
    component.message = 'Carregando...';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('p'));
    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Carregando...');
  });

  it('não deve exibir a mensagem quando não for fornecida', () => {
    component.isLoading = true;
    component.message = undefined;
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('p'));
    expect(messageElement).toBeNull();
  });
});
