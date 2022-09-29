import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private route: Router) { }
  password:string = "";
  email:string = "";
  tryToLogin:boolean = false;

  ngOnInit(): void {
    this.userService.isLoggedIn()
    .then((res) => 
      { 
        if(res === true) {
          this.route.navigate(['/dashboard'])
        } 
      }) 
  }

  login() {
    this.tryToLogin = true;
    this.userService.login(this.email, this.password)
    .catch(err =>
      {
        this.tryToLogin = false;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 5000
        })
      });
  }

}