import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor() { }

  customer: Customer = new Customer();

  ngOnInit(): void {
  }

  save() {
    if(this.customer.firstName.length < 3) {
      this.errorMessage('First Name must be at least 3 characters long');
      return;
    }
    if(this.customer.lastName.length < 3) {
      this.errorMessage('Last Name must be at least 3 characters long');
      return;
    }
   
    console.log(this.customer);
  }

  errorMessage(message:string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    });
  }

}
