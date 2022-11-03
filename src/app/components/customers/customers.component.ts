import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  subscribe: any;
  customers: Customer[] = [];
  customersToShow: Customer[] = [];

  constructor(private customerService: CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.subscribe = this.customerService.customerSubject.subscribe((data) => {
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

  remove(customer:Customer) {
    Swal.fire({
      title: 'Do you want to remove ?',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.showLoading();
        this.customerService.removeCustomerById(customer.id).then(()=>{
          Swal.hideLoading();
          Swal.fire({
            title:'Customer successfully removed',
            timer: 1500
          }
          )
        }).catch(err =>{
          Swal.hideLoading();
          this.error(err.message)
        });
      } else if (result.isDenied) {   
      }
    })  
  }

  error(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  }

  goCustomer(id: number) {
    this.router.navigate(
      ['dashboard/edit'],
      { queryParams: { uid: id } }
    );
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
