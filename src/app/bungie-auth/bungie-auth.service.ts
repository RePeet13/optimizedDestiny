import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})


export class BungieAuthService {
  public apiCredentials = {
    key : "8da07c37cbf94cbfb3793fea94c8aba2",
    clientId : "29842",
    clientSecret : "9.MLmJHq8X-5NnUYOJtG39opTNuDjPCir-NSYa3QWic",
    state : "random",
    authCode : ""
  };
  public apiHeaders = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'X-API-Key' : this.apiCredentials.key
  };
  private authUrl;

  private TOKEN_URL = 'https://www.bungie.net/Platform/App/OAuth/Token/';

  constructor() {
    this.authUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${this.apiCredentials.clientId}&response_type=code&state=${this.apiCredentials.state}`
  }
 
  isLoggedIn() {
    // if (!this.apiCredentials.authCode && !localStorage.getItem('authCode')){
    //   // Redirect to bungie api
    //   return false;
    // }
    // return true;
    console.log("bungieauth service - isLoggedIn - "+localStorage.getItem('accessToken'));
    return localStorage.getItem('accessToken');
  }

  login() {
    console.log("bungieauth service - lets try logging in");
    localStorage.setItem('authState', this.apiCredentials.state);
    window.location.replace(this.authUrl);
  }
 
  logout() {
  }

  getApiKey() {
    return this.apiCredentials.key;
  }

  handleAccessToken(response): String {
    let token = '';
    if (response && response.access_token) {
      const data = response;
      const inception = Date.now();
      const accessToken = {
        value: data.access_token,
        expires: data.expires_in,
        name: 'access',
        inception
      };

      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('bungieMembershipId', data.membership_id);
      console.log(accessToken);
      token = JSON.stringify(accessToken);
      console.log("bungieauth service - handled a token");
      console.log(accessToken);
    }
    return token;
  }

  getAccessTokenFromCode(code: string): Promise<String> { //<Tokens>
    const bodyObj = {
      grant_type: 'authorization_code',
      code: code,
      client_id: this.apiCredentials.clientId,
      client_secret: this.apiCredentials.clientSecret
    };
    const bodyString = Object.keys(bodyObj).map(key => key + '=' + bodyObj[key]).join('&');
    console.log(bodyString);

    let tokenHeaders = this.apiHeaders;
    tokenHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
    return Promise.resolve(
      fetch(this.TOKEN_URL, {
        method: 'POST',
        body: bodyString,
        headers: tokenHeaders
      })
        .then((response) => (response.ok ? response.json() : Promise.reject(response)))
        .then(this.handleAccessToken)
    );
  }

  getAccessToken() {
    const token = JSON.parse(localStorage.getItem('accessToken'))
    return token.value
  }

}
