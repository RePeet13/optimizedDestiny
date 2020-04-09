import { Component } from '@angular/core';

import { BungieAuthService } from '../../bungie-auth/bungie-auth.service';
import { D2ManifestService } from '../d2manifest.service';

@Component({
  selector: 'manifest-explorer',
  templateUrl: './manifest-explorer.component.html',
  styleUrls: ['./manifest-explorer.component.css']
})

export class ManifestExplorerComponent {
  constructor (
    private d2Manifest: D2ManifestService,
    private bungieAuthService: BungieAuthService
  ){
    this.d2Manifest = new D2ManifestService(bungieAuthService);
  }
}