import { LoginComponent } from './../login/login.component';
import { UserService } from './../user.service';
import { GuestService } from './../guest.service';
import { Component, OnInit } from '@angular/core';
import { guest } from '../models/guest.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private guestService: GuestService, private userService: UserService) { }
  guests: guest[];
  totalPeopleCount: number = 0;
  july4thCount: number = 0;
  maccheeseCount: number = 0;
  searchValue: string = "";
  showForm: boolean = false;
  signupForm: FormGroup;
  foodOptions = ['Steak', 'Chicken'];
  showWade: boolean = false;
  selectedGuest: guest;
  ngOnInit() {
    this.guestService.getGuests();

    this.guests = []
    this.guestService.guestsUpdated.subscribe(guests => {
      this.showForm = false;
      this.guests = guests;
      console.log(this.guests)
      this.totalPeopleCount = 0;
      this.guests.forEach(g => {
        if (g.dateOption && g.dateOption.length > 0) {

          this.totalPeopleCount += g.dateOption.length;
        }
      });
      this.totalPeopleCount += this.guests.length;
      // this.maccheeseCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'mac').length;
    })
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'addGuest': new FormControl(false),
      'passengers': new FormArray([])
    });
  }
  get passengers() {
    return this.signupForm.get('passengers') as FormArray;
  }
  get passengersRequired() {
    return this.signupForm.get('passengersRequired');
  }



  editUser(g: any) {
    console.log('in edit user');
    this.userService.createUser("asdsa", "asdas");
    // this.passengers.clear();
    // this.selectedGuest = g;

    // console.log(g.dateOption)
    // this.passengers.patchValue(g.dateOption);
    // for (let i = 0; i < g.dateOption.length; i++) {
    //   console.log("in loop")
    //   this.passengers.push(new FormControl(g.dateOption[i]));
    // }

    // console.log(this.passengers)
    // for (let i = this.passengers.length; i < 8; i++) {
    //   console.log("in loop")
    //   this.passengers.push(new FormControl(''));
    // }

    // console.log('done edit user')
    // this.showForm = true;
  }
  close() {
    this.showForm = false;
  }
  delete() {
    this.guestService.delete(this.selectedGuest._id.toString());
  }
  deleteAll() {
    if (confirm("Are you sure to delete all ")) {
      this.guestService.deleteAll();
    }


  }
  onSubmit() {
    if (!this.signupForm.invalid) {
      let filteredPassengers = this.passengers.value;
      filteredPassengers = filteredPassengers.filter(entry => entry.trim() != '');
      this.guestService.update(this.selectedGuest.firstName, this.selectedGuest.lastName,
        filteredPassengers, this.selectedGuest._id.toString());
    }
  }
}
