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
    httpMock.verify(); // Garante que não há requisições HTTP pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', (done) => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, createdAt: new Date().toISOString() },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, createdAt: new Date().toISOString() },
    ];

    service.loadProducts();

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    service.products$.subscribe((products) => {
      expect(products.length).toBe(mockProducts.length);
      expect(products).toEqual(mockProducts);
      done(); // Aguarda a execução completa do fluxo assíncrono
    });
  });

  it('should filter products by name', (done) => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, createdAt: new Date().toISOString() },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, createdAt: new Date().toISOString() },
    ];
    service['allProducts'] = mockProducts;

    service.filterProductsByName('Product 1');

    service.products$.subscribe((products) => {
      expect(products).toEqual([mockProducts[0]]);
      done();
    });
  });

  it('should create a product', (done) => {
    const newProduct: Product = { id: 3, name: 'Product 3', category: 'Category 3', price: 300, createdAt: new Date().toISOString() };
    const updatedProductList: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, createdAt: new Date().toISOString() },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, createdAt: new Date().toISOString() },
      newProduct,
    ];

    service.createProduct({ name: 'Product 3', category: 'Category 3', price: 300 }).subscribe((product) => {
      expect(product).toEqual(newProduct); // Verifica o produto retornado pelo POST
    });

    // Simula a requisição POST
    const postReq = httpMock.expectOne('http://localhost:3000/products');
    expect(postReq.request.method).toBe('POST');
    postReq.flush(newProduct);

    // Simula a requisição GET disparada por loadProducts()
    const getReq = httpMock.expectOne('http://localhost:3000/products');
    expect(getReq.request.method).toBe('GET');
    getReq.flush(updatedProductList);

    // Verifica se o produto foi adicionado corretamente na lista
    service.products$.subscribe((products) => {
      expect(products).toContain(newProduct);
      done(); // Finaliza o teste
    });
  });


  it('should update a product', (done) => {
    const initialProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, createdAt: new Date().toISOString() },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, createdAt: new Date().toISOString() },
    ];
    service['allProducts'] = initialProducts;

    const updatedProduct: Product = { id: 1, name: 'Updated Product 1', category: 'Category 1', price: 150, createdAt: new Date().toISOString() };

    service.updateProduct(updatedProduct).subscribe((status) => {
      expect(status).toBe('success');
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);

    service.products$.subscribe((products) => {
      expect(products.find(p => p.id === updatedProduct.id)?.name).toBe(updatedProduct.name); // Confirma pelo nome atualizado
      done();
    });
  });

  it('should delete a product', (done) => {
    service['allProducts'] = [
      { id: 1, name: 'Product 1', category: 'Category 1', price: 100, createdAt: new Date().toISOString() },
      { id: 2, name: 'Product 2', category: 'Category 2', price: 200, createdAt: new Date().toISOString() },
    ];

    service.deleteProduct(1).subscribe(() => {
      expect(service['allProducts'].length).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    service.products$.subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products.find(p => p.id === 1)).toBeUndefined();
      done();
    });
  });
});
