import { GuestService } from './../guest.service';
import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private guestService: GuestService, private route: ActivatedRoute, private users: UserService) { }
  signupForm: FormGroup;
  foodOptions = ['Steak', 'Chicken'];
  showThankyou: boolean = false;
  showDate: boolean = true;
  addGuest: boolean = false;
  firstName: string = 'Driver First Name';
  guestOf: string;
  allowDate: boolean = false;
  lastName: string = 'Driver Last Name';
  showCovid: boolean = true;
  ngOnInit() {
    this.allowDate = this.route.snapshot.queryParams['ad'] === 'true';
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'dateOption': new FormControl('bothdates', [Validators.required]),
      'addGuest': new FormControl(false),
      'passengers': new FormArray([]),
      'passengersRequired': new FormControl(0),
      'drinking': new FormControl(null, [Validators.required])
    });

  }
  get passengers() {
    return this.signupForm.get('passengers') as FormArray;
  }
  get passengersRequired() {
    return this.signupForm.get('passengersRequired');
  }

  addPassengers() {
    console.log(' in add passengers');
    console.log(this.passengersRequired.value)
    this.passengers.clear();
    for (let i = 0; i < this.passengersRequired.value; i++) {
      console.log("in loop")
      this.passengers.push(new FormControl(''));
    }

    console.log(this.passengers);
  }
  addAnother() {
    this.showDate = !this.showDate;
  }
  onSubmit() {
    this.users.createUser("info@test.con", "test123")
    // console.log(this.signupForm.value.foodOption);
    // if (!this.signupForm.invalid) {
    //   if (this.guestOf) {
    //     console.log('in guest of')
    //     // this.guestService.addGuest(this.signupForm.value.firstName + this.guestOf, this.signupForm.value.lastName, this.signupForm.value.dateOption);

    //   }
    //   else {
    //     console.log(this.signupForm.value.drinking);
    //     let filteredPassengers = this.passengers.value;
    //     filteredPassengers = filteredPassengers.filter(entry => entry.trim() != '');
    //     console.log(filteredPassengers.join());
    //     this.guestService.addGuest(this.signupForm.value.firstName, this.signupForm.value.lastName, filteredPassengers, this.signupForm.value.drinking);
    //   }
    // }

    // if (this.signupForm.get('addGuest').value) {
    //   this.guestOf = '( ' + this.signupForm.get('firstName').value + ' ' + this.signupForm.get('lastName').value + ' )'
    //   this.signupForm.get('firstName').reset();
    //   this.signupForm.get('lastName').reset();
    //   this.signupForm.get('foodOption').patchValue('steak');
    //   this.signupForm.get('addGuest').patchValue(false);
    //   this.showDate = false;
    //   this.firstName = 'Guest First Name';
    //   this.lastName = 'Guest Last Name';
    // }
    // else {
    //   this.showThankyou = true;
    // }



  }

  showRegisterPage() {
    this.showThankyou = false;
  }
  showThankYouPage() {
    this.showThankyou = true;
  }
}
