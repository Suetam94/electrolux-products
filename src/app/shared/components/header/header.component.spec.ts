import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logoElement = fixture.debugElement.query(By.css('img[alt="Logo Electrolux"]')).nativeElement;
    expect(logoElement).toBeTruthy();
    expect(logoElement.getAttribute('src')).toBe('logo.svg');
  });

  it('should render the search input field and button', () => {
    const inputElement = fixture.debugElement.query(By.css('input[name="searchTerm"]')).nativeElement;
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('placeholder')).toBe('Filtrar por nome');
    expect(buttonElement).toBeTruthy();
  });

  it('should call onInputChange when typing in the input field', () => {
    spyOn(component, 'onInputChange');
    const inputElement = fixture.debugElement.query(By.css('input[name="searchTerm"]')).nativeElement;

    inputElement.value = 'Test Search';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.onInputChange).toHaveBeenCalled();
  });

  it('should call onInputChange when clicking the search button', () => {
    spyOn(component, 'onInputChange');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    buttonElement.click();
    fixture.detectChanges();

    expect(component.onInputChange).toHaveBeenCalled();
  });
});
