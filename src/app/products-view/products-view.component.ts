import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {

  products: Product[] = [];   //Array to hold data to be displayed
  filteredProducts: Product[] = [];   //Array to hold data after filter is applied
  originalData: Product[] = [];   //Array to hold all products received from the server

  constructor(private productService: ProductService) { }

  // Populate the arrays with the data received from server using the productService
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

  // Function to search for a product amongst the filtered products
  // Searches the entire array of products if no filter is applied previously
  onProductSearched(searchText: string) {
    if (searchText === '' || !searchText)
      this.products = this.filteredProducts;

    else
      this.products = this.filteredProducts.filter(product => product.name?.toLowerCase().includes(searchText.toLowerCase()));
  }

  // Function to filter the products based on selected category
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

}
