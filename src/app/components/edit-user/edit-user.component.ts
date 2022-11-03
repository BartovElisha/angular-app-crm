import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit,OnDestroy {

  constructor(private cs: CustomerService, private route: ActivatedRoute, private router:Router) { }

  subscribe: any;

  customer: Customer = new Customer();
  uid:Number = -1;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params && params['uid']) {
        this.uid = Number(params['uid']);
        if(typeof this.uid == 'number') {
          this.getUserFromDBById(this.uid);
        }        
      }
    });
  }

  getUserFromDBById(uid:Number){
    this.subscribe = this.cs.customerSubject.subscribe(data => {
      const customer = data.find(c=>c.id === uid);
      console.log(customer);    
      if(customer) {
        this.customer = customer;
      }  
    });
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

    this.router.navigate([], {
      queryParams: {
        'uid': null
        //'uid': this.customer.id
      },
      queryParamsHandling: 'merge'
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

  ngOnDestroy(): void {
    this.subscribe ? this.subscribe.unsubscribe() : null;
  }  

}
