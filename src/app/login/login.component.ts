import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }
  password: string;
  username: string;
  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password);
  }

}
