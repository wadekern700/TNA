import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { guest } from './models/guest.model';
import { ReplaySubject } from 'rxjs';



const BACKEND_URL = environment.apiUrl + '/Guests/';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) { }
  private guestsUpdated = new ReplaySubject<guest[]>();
  addGuest(firstName: string, lastName: string, food: string) {
    const guestData = {
      firstName,
      lastName,
      foodOption: food
    };
    this.http.post(BACKEND_URL, guestData).subscribe(val => console.log(val));
  }

  getGuests() {
    this.http.get<any>(BACKEND_URL).subscribe(guests => {
      console.log(guests)
      this.guestsUpdated.next(guests.guests);
    });
  }

  getGuestUpdatedListener() {
    return this.guestsUpdated.asObservable();
  }

}
