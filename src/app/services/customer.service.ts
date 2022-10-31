import { Injectable } from '@angular/core';
import { Customer, UserStatus } from '../models/customer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  unsubscribe:any = null;
  customerCollection:string = 'customers';
  customers:Customer[] = [];
  customerSubject = new BehaviorSubject<Customer[]>(this.customers);

  constructor(private afs:AngularFirestore) { 
    this.subscribeToCustomersCollection();
  }

  createCustomer(customer:Customer): any {
    const pathToDocument = 'customers/' + customer.id;
    return this.afs.doc(pathToDocument).set(customer.toFirebase());
  }

  // This function reports to all about changes in database.
  subscribeToCustomersCollection(status:UserStatus = 1) {
    if (this.unsubscribe !== null) {
      return;
      //I already subscribe to customer collection can exist
    }
    this.afs.collection(this.customerCollection).ref
    .where('status','==',status)
    .onSnapshot((documents) => {
      this.customers = [];
      documents.forEach((doc) => {
        this.customers.push(Customer.fromFirebaseToClass(doc.data()));
        // console.log(this.customers);
      });

      this.customerSubject.next(this.customers);
    },
    (error) => {
      console.log(error);
    });
  }
}
