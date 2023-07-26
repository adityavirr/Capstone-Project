import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output()
  productFiltered: EventEmitter<any> = new EventEmitter<any>;

  constructor() { }

  ngOnInit(): void {
  }

  // Method to emit the category
  filterProduct(filterCategory:string){
    this.productFiltered.emit(filterCategory);
  }

}
