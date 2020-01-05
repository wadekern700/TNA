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
  showThankyou: boolean = false;
  showDate: boolean = true;
  addGuest: boolean = false;
  firstName: string = 'First Name';
  guestOf: string;
  lastName: string = 'Last Name';
  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'foodOption': new FormControl('steak', [Validators.required]),
      'addGuest': new FormControl(false)
    });

  }
  addAnother() {
    this.showDate = !this.showDate;
  }
  onSubmit() {
    console.log(this.signupForm.value.foodOption);
    if (!this.signupForm.invalid) {
      if (this.guestOf) {
        console.log('in guest of')
        this.guestService.addGuest(this.signupForm.value.firstName + this.guestOf, this.signupForm.value.lastName, this.signupForm.value.foodOption);

      }
      else {
        console.log(' not in guest of')
        this.guestService.addGuest(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.foodOption);
      }
    }

    if (this.signupForm.get('addGuest').value) {
      this.guestOf = '( ' + this.signupForm.get('firstName').value + ' ' + this.signupForm.get('lastName').value + ' )'
      this.signupForm.get('firstName').reset();
      this.signupForm.get('lastName').reset();
      this.signupForm.get('foodOption').patchValue('steak');
      this.signupForm.get('addGuest').patchValue(false);
      this.showDate = false;
      this.firstName = 'Guest First Name';
      this.lastName = 'Guest Last Name';
    }
    else {
      this.showThankyou = true;
    }



  }

}
