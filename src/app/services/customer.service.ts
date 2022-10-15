import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private afs:AngularFirestore) { }

  createCustomer(customer:Customer): any {
    const pathToDocument = 'customers/' + customer.id;
    return this.afs.doc(pathToDocument).set(customer.toFirebase());
  }
}
