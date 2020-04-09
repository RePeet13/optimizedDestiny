import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BungieAuthService } from './bungie-auth.service';

@Component({
  selector: 'auth-return',
  templateUrl: './auth-return.component.html',
  styleUrls: ['./auth-return.component.css']
})
export class AuthReturnComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bungieAuthService: BungieAuthService,
  ){}

  ngOnInit() {
    const returnedAuthCode: string = this.route.snapshot.queryParamMap.get('code');
    const returnedState: string = this.route.snapshot.queryParamMap.get('state');
    console.log(returnedAuthCode);
    const expectedAuthState = localStorage.getItem('authState');
    if (returnedState !== expectedAuthState) {
        console.log('Error - mismatching auth state. Expected: ' + expectedAuthState + ' but got: ' + returnedState)
      return;
    }
    this.bungieAuthService.getAccessTokenFromCode(returnedAuthCode)
        .then((token) => {this.router.navigate(['/'])});
  }
}