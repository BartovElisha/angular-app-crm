import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private cs: CustomerService) { }

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

    this.cs.createCustomer(this.customer)
    .then(() => {
      this.customer = new Customer();
      Swal.fire(
        'Customer Created Successfully !!!',
        'You clicked the button!',
        'success');
    })
    .catch((error:any) => {
      this.errorMessage(error.message);
    });
   
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
