import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CategorySelectComponent } from './category-select.component';

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategorySelectComponent, // Inclui o componente standalone
        FormsModule, // Importa qualquer módulo necessário
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render categories in the select dropdown', () => {
    component.categories = [
      { id: 1, name: 'Categoria 1' },
      { id: 2, name: 'Categoria 2' },
    ];
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3); // 2 categorias + 1 placeholder
    expect(options[1].nativeElement.textContent.trim()).toBe('Categoria 1');
    expect(options[2].nativeElement.textContent.trim()).toBe('Categoria 2');
  });

  it('should call onCategoryChange when an option is selected', () => {
    spyOn(component, 'onCategoryChange');
    component.categories = [
      { id: 1, name: 'Categoria 1' },
      { id: 2, name: 'Categoria 2' },
    ];
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[1].value; // Seleciona a primeira categoria
    select.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.onCategoryChange).toHaveBeenCalledWith('Categoria 1');
  });
});
