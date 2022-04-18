import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'PrayerSearchPipe', pure: false })
export class PrayerSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(prayer => {
          return prayer.prayer.search(searchText) !== -1;
      });
    }
  }
}