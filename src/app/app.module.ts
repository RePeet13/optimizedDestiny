import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiTesterComponent } from './api-tester/api-tester.component';
import { AuthReturnComponent } from './bungie-auth/auth-return.component';
import { ManifestExplorerComponent } from './services/manifest-explorer/manifest-explorer.component';
import { D2ManifestService } from './services/d2manifest.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ApiTesterComponent,
    AuthReturnComponent,
    ManifestExplorerComponent
  ], 
  imports: [
    BrowserModule,
    //AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
//      { path: '', component: AppComponent },
      { path: 'api-tester', component: ApiTesterComponent },
      { path: 'authReturn', component: AuthReturnComponent },
      { path: 'mf', component: ManifestExplorerComponent },
    ])
  ],
  providers: [D2ManifestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
