import { UserService } from './../user.service';
import { GuestService } from './../guest.service';
import { Component, OnInit } from '@angular/core';
import { guest } from '../models/guest.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private guestService: GuestService, private userService: UserService) { }
  guests: guest[];
  lobsterCount: number = 0;
  steakCount: number = 0;
  maccheeseCount: number = 0;
  searchValue: string = "";
  showForm: boolean = false;
  signupForm: FormGroup;
  foodOptions = ['Steak', 'Chicken'];
  showWade: boolean = false;
  selectedGuest: guest;
  ngOnInit() {
    this.guestService.getGuests();
    this.guestService.guestsUpdated.subscribe(guests => {
      this.showForm = false;
      this.guests = guests;
      this.lobsterCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'lobster').length;
      this.steakCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'steak').length;
      this.maccheeseCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'mac').length;
    })
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'foodOption': new FormControl('', [Validators.required]),
    });
  }
  editUser(g: any) {
    this.selectedGuest = g;
    this.showForm = true;
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
      console.log(this.selectedGuest.foodOption);
      this.guestService.update(this.selectedGuest.firstName, this.selectedGuest.lastName,
        this.selectedGuest.foodOption, this.selectedGuest._id.toString());
    }
  }
}
