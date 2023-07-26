import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  originalData: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.originalData = data;
        this.products = data;
        this.filteredProducts = data;
      },
      error: error => {
        alert('Failed to Fetch Products Due to Server Error !!');
      }
    });
  }

  onProductSearched(searchText: string) {
    if (searchText === '' || !searchText)
      this.products = this.filteredProducts;

    else
      this.products = this.filteredProducts.filter(product => product.name?.toLowerCase().includes(searchText.toLowerCase()));
  }
  //   this.productService.getProducts().subscribe({
  //      next: data => {
  //        if(searchText === '' || !searchText)
  //        this.products = data;

  //        else
  //        this.products = this.products.filter(product => product.name?.toLowerCase().includes(searchText.toLowerCase()));
  //      },
  //      error: error => {
  //        alert('Failed to Fetch Products Due to Server Error !!');
  //      }
  //    });
  // }

  onProductFiltered(filterCategory: string) {
    if (filterCategory === '' || !filterCategory) {
      this.products = this.originalData;
      this.filteredProducts = this.originalData;
    }

    else {
      this.filteredProducts = this.originalData.filter(product => product.category === filterCategory);
      this.products = this.filteredProducts;
    }
  }
  //   this.productService.getProducts().subscribe({
  //     next: data => {
  //       if (filterCategory === '' || !filterCategory) {
  //         this.products = data;
  //         this.filteredProducts = data;
  //       }

  //       else {
  //         this.filteredProducts = data.filter(product => product.category === filterCategory);
  //         this.products = this.filteredProducts;
  //       }
  //     },
  //     error: error => {
  //       alert('Failed to Fetch Products Due to Server Error !!');
  //     }
  //   });
  // }

}
