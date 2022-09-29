import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:firebase.auth.UserCredential | undefined;

  
  constructor(private route: Router,public auth: AngularFireAuth) { }

  private _isLoggedIn:boolean | null = null;

  isLoggedIn() : Promise<boolean> {
   return new Promise ((resolve,reject) => {
        if (this._isLoggedIn !== null) {
          resolve(this._isLoggedIn);
        }
        else {
          this.auth.onAuthStateChanged(
            user => {this.userStateChanged(user);
                    if (user) {
                      resolve(true);
                    }else {
                      resolve(false);
                    }}
          )
        }
   })
  }

  userStateChanged(user: firebase.User | null){
    if (user) {
      this._isLoggedIn = true;
      this.route.navigate(['/dashboard']);
      console.log(user);
    }
    else {
      this._isLoggedIn = false;
      this.route.navigate(['/login']);
    }
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then((user:firebase.auth.UserCredential) => {
      this.user = user;
      console.log(user);
      this._isLoggedIn = true;
    })
  }

  logout() {
    this.auth.signOut() }
}
