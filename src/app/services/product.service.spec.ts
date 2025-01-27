import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200 },
    ];

    service.loadProducts();

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    service.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should filter products by name', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200 },
    ];
    service['allProducts'] = mockProducts;

    service.filterProductsByName('Product 1');

    service.filterProductsByName('');
    service.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should create a product', () => {
    const newProduct: Product = { id: 3, name: 'Product 3', category: 'Category 3', price: 300 };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);

    service.products$.subscribe((products) => {
      expect(products).toContain(newProduct);
    });
  });

  it('should update a product', () => {
    service['allProducts'] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200 },
    ];

    const updatedProduct: Product = { id: 1, name: 'Updated Product 1', category: 'Category 1', price: 150 };

    service.updateProduct(updatedProduct).subscribe((status) => {
      expect(status).toBe('success');
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);

    service.products$.subscribe((products) => {
      expect(products).toContain(updatedProduct);
    });
  });

  it('should delete a product', () => {
    service['allProducts'] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200 },
    ];

    service.deleteProduct(1).subscribe(() => {
      expect(service['allProducts'].length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
