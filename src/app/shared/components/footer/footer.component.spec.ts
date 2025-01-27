import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent], // Inclui o componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the copyright text', () => {
    const paragraphElement = fixture.debugElement.query(By.css('footer p')).nativeElement;
    expect(paragraphElement.textContent).toContain('© 2025 Mateus Vinícius da Silva. Todos os direitos reservados.');
  });

  it('should contain a LinkedIn link with correct attributes', () => {
    const linkedInLink = fixture.debugElement.query(
      By.css('a[href="https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/"]'),
    ).nativeElement;

    expect(linkedInLink).toBeTruthy();
    expect(linkedInLink.getAttribute('target')).toBe('_blank');
    expect(linkedInLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(linkedInLink.textContent.trim()).toBe('LinkedIn');
  });

  it('should contain a Portfolio link with correct attributes', () => {
    const portfolioLink = fixture.debugElement.query(By.css('a[href="https://me-zeta-ivory.vercel.app/home"]'));

    expect(portfolioLink).toBeTruthy();
  });
});
