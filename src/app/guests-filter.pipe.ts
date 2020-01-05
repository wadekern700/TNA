import { Pipe, PipeTransform } from '@angular/core';
import { guest } from './models/guest.model';

@Pipe({
  name: 'guestsFilter'
})
export class GuestsFilterPipe implements PipeTransform {

  transform(guests: guest[], searchProp: string): any {
    if (guests && guests.length > 0 && searchProp.length > 0) {
      return guests.filter((g: guest) => g.firstName.toLowerCase().includes(searchProp.toLowerCase()) || g.lastName.toLowerCase() === searchProp.toLowerCase());
    }
    return guests;
  }

}
