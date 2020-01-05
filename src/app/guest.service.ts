import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { guest } from './models/guest.model';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';



const BACKEND_URL = environment.apiUrl + '/Guests/';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient, private router: Router) { }
  guestsUpdated = new ReplaySubject<guest[]>();
  addGuest(firstName: string, lastName: string, food: string) {
    const guestData = {
      firstName,
      lastName,
      foodOption: food
    };
    this.http.post(BACKEND_URL, guestData).subscribe(val => {

    }
    );
  }

  getGuests() {
    this.http.get<any>(BACKEND_URL).subscribe(guests => {
      this.guestsUpdated.next(guests.guests);
    });
  }
  delete(id: string) {

    this.http.delete(BACKEND_URL + id).subscribe(val => this.getGuests());

  }

  update(firstName: string, lastName: string, food: string, id: string) {

    const guestData = {
      firstName,
      lastName,
      foodOption: food,
      id: id
    };

    this.http
      .put(BACKEND_URL + id, guestData)
      .subscribe(response => {
        this.getGuests();
      });
  }

  deleteAll() {
    this.http.delete(BACKEND_URL).subscribe(value => {
      this.getGuests();
    });
  }

  getGuestUpdatedListener() {
    return this.guestsUpdated.asObservable();
  }

}
