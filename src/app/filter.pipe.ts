import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterNumber: number, prompName: string): any {
    if (value.length === 0 || filterNumber === null) {
          return value;
    }
    const resultArray = [];
    for(const item of value) {
      if (item[prompName] === filterNumber) {
          resultArray.push(item);
      }
    }
    return resultArray;
  }

}
