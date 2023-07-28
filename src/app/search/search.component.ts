import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searched: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  // SearchForm form group with searchText form control
  searchForm = this.fb.group({
    searchText: ['']
  });

  // Function to emit the searchText value
  searchEvent() {
    const searchTerm = this.searchForm.get('searchText')?.value;
    this.searched.emit(searchTerm);
  }

  // Function to reset the form 
  resetSearch() {
    this.searchForm.reset();
    this.searched.emit("");
  }
}
