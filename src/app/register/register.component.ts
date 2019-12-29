import { GuestService } from './../guest.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private guestService: GuestService) { }
  signupForm: FormGroup;
  foodOptions = ['Steak', 'Chicken'];
  showWade: boolean = false;
  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'foodOption': new FormControl(''),
    });

  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.guestService.addGuest(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.foodOption);
    }
    this.signupForm.reset();
  }

}
