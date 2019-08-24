import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BungieAuthService {
  bungieApiKey = '0ad5a8858b0b4d808674c358251ed905';

  constructor() {}

  authenticate() {
    console.log('Starting Authentication!');
  }
}
