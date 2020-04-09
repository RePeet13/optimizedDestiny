import { get, set, del } from 'idb-keyval';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BungieAuthService } from '../bungie-auth/bungie-auth.service';
import _ from 'lodash';


@Injectable()
export class D2ManifestService {
    lsManifestVsKey = 'd2manifest-version';
    manifestVs = '';
    idbManifestKey = 'd2manifest';

    alwaysLoadRemote = false;

    private manifestPromise: Promise<object> | null = null;

    constructor (
        private bungieAuthService: BungieAuthService
    ) {
        console.log("creating manifestservice");
        console.log(localStorage.getItem(this.lsManifestVsKey));

        // TODO need to have a better check i think
        if (this.alwaysLoadRemote || localStorage.getItem(this.lsManifestVsKey) === null) {
            this.manifestPromise = this.doGetManifest();
        }
    }

    private async doGetManifest(): Promise<object> {
        // const data = await this.getManifestApi();
        const manifest_url = 'https://www.bungie.net/Platform/Destiny2/Manifest/';
        let headers = this.bungieAuthService.apiHeaders;
        headers['Content-Type'] = 'application/json';
        const response = await fetch(manifest_url, { headers: headers });
        const data = await response.json();
        console.log('Heres the data');
        console.log(data);
        const path = data['Response']['jsonWorldContentPaths']['en'];

        console.log('Path is: ' + path);
        const version = path;
        this.manifestVs = version;

        return this.loadManifestRemote(version, path);
    }

    private async loadManifestRemote (
        version: string,
        path: string
    ): Promise<object> {
        console.log('Finally trying to load manifest');

        const response = await fetch(`https://www.bungie.net${path}`);
        const body = await (response.ok ? response.json() : Promise.reject(response));

        // console.log('Manifest Body');
        // console.log(body);
        const manifest = body;
        this.saveManifestToIndexedDb(manifest, version);
        return manifest;
    }

    private async saveManifestToIndexedDb (
        typedArray: object,
        version: string
        ) {
            await set(this.idbManifestKey, typedArray);
            console.log(`Sucessfully stored manifest file.`);
            localStorage.setItem(this.lsManifestVsKey, version);
    }

}

async function getDefinitionsUncached() {
    return await get(this.idbManifestKey);
}
export const getDefinitions = _.once(getDefinitionsUncached);
