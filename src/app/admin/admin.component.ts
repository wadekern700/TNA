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
  ngOnInit() {
    this.guestService.getGuests();
    this.guestService.getGuestUpdatedListener().subscribe(guests => this.guests = guests);
  }

}
