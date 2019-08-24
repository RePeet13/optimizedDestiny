import { Component } from '@angular/core';
import { BungieAuthService } from './bungie-auth/bungie-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private bungieAuthService: BungieAuthService,
  ){}
  
  title = 'sparrow-sidecar';

  bungieAuthenticate() {
    this.bungieAuthService.authenticate();
  }
}
