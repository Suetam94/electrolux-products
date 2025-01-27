import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoDataComponent } from './no-data.component';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default content when no message is provided', () => {
    const img = fixture.debugElement.query(By.css('img'));
    const h2 = fixture.debugElement.query(By.css('h2'));
    const p = fixture.debugElement.query(By.css('p'));

    expect(img.nativeElement.src).toContain('assets/no-data.svg');
    expect(h2.nativeElement.textContent).toBe('Nada encontrado');
    expect(p.nativeElement.textContent.trim()).toBe('Não há itens disponíveis no momento.');
  });

  it('should display custom message when provided', () => {
    component.message = 'Custom no data message';
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent.trim()).toBe('Custom no data message');
  });

  it('should have correct structure and classes', () => {
    const container = fixture.debugElement.query(By.css('div'));
    const img = fixture.debugElement.query(By.css('img'));
    const h2 = fixture.debugElement.query(By.css('h2'));
    const p = fixture.debugElement.query(By.css('p'));

    expect(container.nativeElement.className).toContain('flex flex-col items-center justify-center text-center py-8');
    expect(img.nativeElement.className).toContain('w-24 h-24 mb-4');
    expect(h2.nativeElement.className).toContain('text-electrolux-dark-gray text-lg font-bold mb-2');
    expect(p.nativeElement.className).toContain('text-electrolux-dark-gray text-sm');
  });
});
