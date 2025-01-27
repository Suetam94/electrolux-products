import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  private allProducts: Product[] = [];
  private productsSource = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSource.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (products: Product[]) => {
        this.allProducts = products;
        this.allProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.productsSource.next(this.allProducts);
      },
      error: (error) => console.error(error),
    });
  }


  filterProductsByName(name: string): void {
    if (name.trim() === '') {
      this.productsSource.next(this.allProducts);
    } else {
      const filteredProducts = this.allProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()),
      );
      this.productsSource.next(filteredProducts);
    }
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct = {
      ...product,
      createdAt: new Date().toISOString(),
    };

    return this.http.post<Product>(this.apiUrl, newProduct).pipe(
      tap(() => {
        this.loadProducts();
      }),
    );
  }


  updateProduct(product: Product): Subject<'success' | 'error'> {
    const resultSubject = new Subject<'success' | 'error'>();

    this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).subscribe({
      next: (updatedProduct) => {
        const index = this.allProducts.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.allProducts[index] = updatedProduct;
          this.productsSource.next([...this.allProducts]);
        }
        resultSubject.next('success');
        resultSubject.complete();
      },
      error: (error) => {
        console.error('Erro ao atualizar o produto:', error);
        resultSubject.next('error');
        resultSubject.complete();
      },
    });

    return resultSubject;
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.allProducts = this.allProducts.filter((p) => p.id !== id);
        this.productsSource.next(this.allProducts);
      }),
    );
  }
}
