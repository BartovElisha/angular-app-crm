import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  subscribe: any;
  customers: Customer[] = [];
  customersToShow: Customer[] = [];

  constructor(private customerSarvice: CustomerService) { }

  ngOnInit(): void {
    this.subscribe = this.customerSarvice.customerSubject.subscribe((data) => {
      console.log(data);
      this.customers = data;
      this.search("");
    });
  }

  search(value: string) {
    value = value.toLowerCase();
    this.customersToShow = this.customers.filter(c => c.firstName.toLowerCase().includes(value) || 
    c.lastName.toLowerCase().includes(value) ||
    c.address.toLowerCase().includes(value) ||
    c.email.toLowerCase().includes(value) ||
    c.phoneNumber.toLowerCase().includes(value) )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
