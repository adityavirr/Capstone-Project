import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private fb: FormBuilder) { }
 
  // Properties
  orders: Order[] = [];

  searchTypeControl: FormControl = new FormControl('productName');

  dataSource!: MatTableDataSource<Order>;

  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25];

  range = this.fb.group({
    start: [null],
    end: [null],
  });

  maxDate = this.removeTimeFromDate(new Date());

  ngOnInit(): void {

    // Fetch orders from the orderService
    this.orderService.getOrders().subscribe({
      next: orders => {
        console.log('OrderService:', orders)
        this.orders = orders;

        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        alert("Failure while connecting to server, try again!!");
      }
    });
  }

  // Table Columns
  displayedColumns: string[] = ['id', 'date', 'productName', 'productWeight', 'isEggless', 'quantity', 'deliveryDetails', 'message', 'userDetails', 'totalAmount'];

  // Function to format date in dd/mm/yyyy format
  formatDate(date: string): string {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en');
  }
  
  
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSearched(searchText: string) {
    if (searchText === '' || !searchText)
      this.dataSource.data = this.orders;

    else{
      const searchType = this.searchTypeControl.value;

      if(searchType === 'productName')
      this.dataSource.data = this.dataSource.data.filter(order => order.productName?.toLowerCase().includes(searchText.toLowerCase()));

      if(searchType === 'userName'){
      this.dataSource.data = this.dataSource.data.filter(order => order.user?.firstName?.toLowerCase().includes(searchText.toLowerCase())
       || order.user?.lastName?.toLowerCase().includes(searchText.toLowerCase()));
      }

      if(searchType === 'orderId')
      this.dataSource.data = this.dataSource.data.filter(order => order?.id === +(searchText));
    }
  }

  // Function to remove time from date
  removeTimeFromDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Function to check if given date is within given date range
  isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
    return date >= this.removeTimeFromDate(startDate) && date <= this.removeTimeFromDate(endDate);
  }
  
  // Function to apply the filter
  applyFilter() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (startDate && endDate) {
      this.dataSource.data = this.dataSource.data.filter(order => {
        const orderDate = new Date(order.date!);
        return this.isDateInRange(this.removeTimeFromDate(orderDate), startDate, endDate);
      });
    } else {
      this.dataSource.data = this.dataSource.data;
    }
  }

  // Function to reset the filter
  resetForm(){
    this.range.reset();
    this.dataSource.data = this.orders;
  }
}
