import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // Event emitter to emit changes in the user form data
  @Output()
  userFormValueChange: EventEmitter<any> = new EventEmitter<any>();

  // Event emitter to emit the validity status of the user form
  @Output()
  userFormValidity: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private addressService: AddressService) { }

  addressSuggestions: any[] = [];

  isEditable = new FormControl(false);

  // Initialize the user form and subscribe to value changes
  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.subscribeToAddressChanges();
  }

  subscribeToAddressChanges() {

    this.isEditable.valueChanges.subscribe((value) => {
      if (value) {

        // Setting the validators when manual address entry is enabled

        this.userForm.get("address.street")?.setValidators([Validators.required]);
        this.userForm.get("address.city")?.setValidators([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]);
        this.userForm.get("address.state")?.setValidators([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]);
        this.userForm.get("address.pinCode")?.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);

        //autocomplete address validators are cleared and value set to empty
        this.userForm.get("address.address")?.setValue('');
        this.userForm.get("address.address")?.clearValidators();
        
      } else {

        // Removing validators when autocomplete address is selected
        this.userForm.get("address.address")?.setValidators([Validators.required]);

        this.userForm.get("address.street")?.clearValidators();
        this.userForm.get("address.city")?.clearValidators();
        this.userForm.get("address.state")?.clearValidators();
        this.userForm.get("address.pinCode")?.clearValidators();

        this.userForm.get("address.street")?.setValue('');
        this.userForm.get("address.city")?.setValue('');
        this.userForm.get("address.state")?.setValue('');
        this.userForm.get("address.pinCode")?.setValue('');

      }

      // Updating the validity of the form fields

      this.userForm.get("address.address")?.updateValueAndValidity();
      this.userForm.get("address.street")?.updateValueAndValidity();
      this.userForm.get("address.city")?.updateValueAndValidity();
      this.userForm.get("address.state")?.updateValueAndValidity();
      this.userForm.get("address.pinCode")?.updateValueAndValidity();
    });

  }
  // Define the user form using FormBuilder
  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z ]+$/)]],
    lastName: [''],
    gender: ['', Validators.required],
    age: [],
    email: ['', [Validators.required, Validators.pattern(/([a-zA-Z]+[_.]*[0-9]*)@([a-zA-Z]+[0-9]*)+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]*)?$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6789]\d{9,9}$/)]],
    address: this.fb.group({
      address: ['', Validators.required],
      street: [''],
      city: [''],
      state: [''],
      pinCode: ['']
    })
  });

  // Getter methods for access to individual form controls
  get firstName() { return this.userForm.get("firstName") };
  get gender() { return this.userForm.get("gender"); }
  get age() { return this.userForm.get("age"); }
  get email() { return this.userForm.get("email"); }
  get phone() { return this.userForm.get("phone"); }
  get address() { return this.userForm.get("address"); }
  get street() { return this.userForm.get("address.street"); }
  get city() { return this.userForm.get("address.city"); }
  get state() { return this.userForm.get("address.state"); }
  get pinCode() { return this.userForm.get("address.pinCode"); }

  // Subscribe to user form value changes
  subscribeToFormChanges() {
    this.userForm.valueChanges.subscribe((formData) => {
      // Emit the changes in the user form data
      this.userFormValueChange.emit(formData);
      // Emit the validity status of the user form
      this.userFormValidity.emit(this.userForm.valid);
    });
  }

// Function to get autocomplete suggestions through the addressService 
  onAddressInput(event: any) {
    const query = event.target.value;
    if (query.length >= 3) {
      this.addressService.searchAddress(query).subscribe((data) => {
        this.addressSuggestions = data;
      });
    } else {
      this.addressSuggestions = [];
    }
  }

// Reset suggestions after an option is selected
  onSelectAddress() {
    this.addressSuggestions = [];
  }

}
