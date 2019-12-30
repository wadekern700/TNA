import { GuestService } from './../guest.service';
import { Component, OnInit } from '@angular/core';
import { guest } from '../models/guest.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private guestService: GuestService) { }
  guests: guest[];
  chickenCount: number = 0;
  steakCount: number = 0;
  searchValue: string = "";
  ngOnInit() {
    this.guestService.getGuests();
    this.guestService.getGuestUpdatedListener().subscribe(guests => {
      this.guests = guests;

      this.chickenCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'chicken').length;
      this.steakCount = this.guests.filter(g => g.foodOption.toLowerCase() === 'steak').length;
    })

  }
}
