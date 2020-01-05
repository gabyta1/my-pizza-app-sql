import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Stores} from '../stores.module';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;
@Injectable()
export class BranchService {
 private stores: Stores[];
  // = [new Stores('Ramat-Gan', 'Tirzah', '15'),
  //   new Stores('Herzliya', 'Sokolov', '13'),
  //   new Stores('Tel-Aviv', 'Dizengoff', '177')
  // ];


  constructor(private http: HttpClient) {}

  getStore() {
    return this.stores.slice();
  }

  getStores(index: number) {
    return this.stores.slice()[index];
  }

  public findCityId(city: string) {
    for (const x of this.stores) {
      if (city === x.city) {
      return x.b_id;
      }
    }
  }

    public getStoreDb() {
       return this.http.get(BACKEND_URL  + '/branch').pipe(
        map(responseData => {
          this.stores = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.stores.push({ ...responseData[key]});  
            }
          }
          return this.stores;
        })
      );
    }

}
