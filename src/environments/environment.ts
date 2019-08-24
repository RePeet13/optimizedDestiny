// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bungieAuthEndpoint: 'https://www.bungie.net/en/OAuth/Authorize',
  bungieTokenEndpoint: 'https://www.bungie.net/platform/app/oauth/token/',
  bungieApiKey: '0ad5a8858b0b4d808674c358251ed905',
  bungieAuthQueryObj: {
    'response_type': 'code',
    'client_id': '2521',
    'state': ''
  },
  bungieTokenHeaderObj: {
    'Authorization': 'Basic ',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  bungieTokenNewHeaderObj:{
    'grant_type': 'authorization_code&code='
  },
  bungieTokenRefreshHeaderObj:{
    'grant_type': 'refresh_token&code='
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
