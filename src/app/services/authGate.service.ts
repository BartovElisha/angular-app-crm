import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()

export class IfUserLogin implements CanActivate {
  constructor(private userService:UserService) {}


  canActivate(): boolean {
    return this.userService.isLoggedIn();
  }
}