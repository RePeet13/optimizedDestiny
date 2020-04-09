import { Component } from '@angular/core';

import { BungieAuthService } from '../bungie-auth/bungie-auth.service';
import { D2ManifestService } from '../services/d2manifest.service';

@Component({
  selector: 'api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.css']
})
export class ApiTesterComponent {
  
	response = {};
	items = []; // DestinyMembershipId=4611686018433502810
	urlsCalled = [];
	private baseUrl = 'https://www.bungie.net/';
	returnItems = [];
	manifestCategoriesLoaded = 0;
	triumphs = [];

	// X-API-Key
	constructor(
		private bungieAuthService: BungieAuthService,
		private d2ManifestService: D2ManifestService
	){
		this.d2ManifestService = new D2ManifestService(bungieAuthService);
		const urlHistoryString = localStorage.getItem('urlHistory');
		this.urlsCalled = urlHistoryString ? urlHistoryString.split('~') : [];
		if (localStorage.getItem('bungieMembershipId')) {
				// this.items.push(['Manifest Category Count', this.manifestCategoriesLoaded]);
			this.items.push(['Bungie Membership Id', localStorage.getItem('bungieMembershipId')]);
			this.items.push(['Xbox MembershipType', 1]);
			this.items.push(['Destiny Membership Id', 4611686018433502810])
			this.items.push(['Destiny Character Ids', [
				"2305843009267721472",
				"2305843009267721474",
				"2305843009267721475"
			]])
		}
	}

	//   /Destiny2/1/Profile/4611686018433502810/?components=100,200
	//   /User/GetMembershipsById/6452351/1/
	callApi(pathInput: string) {
	const url = pathInput.includes(this.baseUrl) ? pathInput : this.baseUrl + pathInput;
	this.urlsCalled.unshift(url);
	localStorage.setItem('urlHistory', this.urlsCalled.join('~'));
	fetch(url, {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'X-API-Key' : this.bungieAuthService.getApiKey(),
			'Authorization' : 'Bearer ' + this.bungieAuthService.getAccessToken()
		}
	})
		.then((response) => (response.ok ? response.json() : Promise.reject(response)))
			.then((response) => {this.response = response})
			.then((response) => {this.checkForRecords()})
	}
	
	checkForRecords() {
		let records = [];
		if (this.response['Response']['profileRecords']) {
			Object.keys(this.response['Response']['profileRecords']['data']['records']).forEach(recElement => {
				let recordElementData = this.response['Response']['profileRecords']['data']['records'][recElement];
				// let recordInfo = this.bungieManifestService.getItem('DestinyRecordDefinition', recElement);
				console.log('Record Data');
				console.log(recordElementData);
				console.log('Record Info');
				let record = this.manifest['DestinyRecordInformation'][recElement];
				console.log(record);
				// console.log(recordInfo);


				// Parents
				let parentNodeNames = []
				// if (recordInfo['presentationInfo']['parentPresentationNodeHashes']) {
				// 	recordInfo['presentationInfo']['parentPresentationNodeHashes'].forEach(element => {
				// 		let name = '';
				// 		let parentInfo = this.bungieManifestService.getItem('DestinyPresentationNodeDefinition', element);
				// 		if (parentInfo['parentNodeHashes']) {
				// 			parentInfo['parentNodeHashes'].forEach(parentNodeHash => {
				// 				name += this.bungieManifestService.getItem('DestinyPresentationNodeDefinition', parentNodeHash)['displayProperties']['name'] + ' - ';
				// 			});
				// 		}
				// 		name += parentInfo['displayProperties']['name'];
				// 		parentNodeNames.push(name);
				// 		console.log('ParentInfo');
				// 		console.log(parentInfo);
				// 	});
				// }


				// Objectives
				// let objectives = recordElementData['objectives'];
				// objectives.forEach(objElement => {
				// 	let objectiveInfo = this.bungieManifestService.getItem('DestinyObjectiveDefinition', objElement['objectiveHash']);
				// 	objElement['name'] = objectiveInfo['progressDescription'];
				// 	console.log('Objective Info');
				// 	console.log(objectiveInfo);
				// });


				// records.push({
				// 	name : recordInfo['displayProperties']['name'],
				// 	description : recordInfo['displayProperties']['description'],
				// 	parentNodeNames : parentNodeNames,
				// 	objectives : objectives,
				// 	state : recordElementData['state'],
				// 	stateName : this.bungieManifestService.getRecordStatesFromNumber(recordElementData['state'])
				// })
			});
		}
		if (records) {
			this.triumphs = records;
		}
	}
}

	// callRecordsApi(charId: String) {
	// 	const url = this.baseUrl + '/Destiny2/Manifest/DestinyRecordDefinition/'
	// 				+ charId;
  //   this.urlsCalled.unshift(url);
  //   localStorage.setItem('urlHistory', this.urlsCalled.join('~'));
  //   fetch(url, {
  //     method : 'GET',
  //     headers : {
  //       'Content-Type' : 'application/json',
  //       'X-API-Key' : this.bungieAuthService.getApiKey(),
  //       'Authorization' : 'Bearer ' + this.bungieAuthService.getAccessToken()
  //     }
  //   })
  //     .then((response) => (response.ok ? response.json() : Promise.reject(response)))
  //     .then((response) => {this.response = response})
  // }
	// }
