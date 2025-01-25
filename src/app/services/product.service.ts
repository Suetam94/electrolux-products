import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private allProducts: Product[] = [];
  private productsSource = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSource.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (products: Product[]) => {
        this.allProducts = products;
        this.productsSource.next(products);
      },
      error: (error) => console.error(error),
    });
  }

  filterProductsByName(name: string): void {
    if (name.trim() === '') {
      this.productsSource.next(this.allProducts);
    } else {
      const filteredProducts = this.allProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      this.productsSource.next(filteredProducts);
    }
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap((newProduct) => {
        this.allProducts = [...this.allProducts, newProduct];
        this.productsSource.next(this.allProducts);
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap((updatedProduct) => {
        this.allProducts = this.allProducts.map((p) =>
          p.id === id ? updatedProduct : p
        );
        this.productsSource.next(this.allProducts);
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.allProducts = this.allProducts.filter((p) => p.id !== id);
        this.productsSource.next(this.allProducts);
      })
    );
  }

}
