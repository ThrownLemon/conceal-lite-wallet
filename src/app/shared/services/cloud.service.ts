import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	constructor(private http: HttpClient) { }

	api = AppConfig.walletAPI;

	getWalletsData = () => {
		return this.http.get(`${this.api}/wallet/unified`);
	};

	getMarketData = () => {
		if (sessionStorage.getItem('market_data') !== null) {
			return new Observable(observer => {
				observer.next(JSON.parse(sessionStorage.getItem('market_data')));
				observer.complete();
			})
		} else {
			return this.http.get('https://api.coingecko.com/api/v3/coins/conceal?sparkline=true');
		}
	};

	getWalletKeys = (address, code) => {
		return this.http.get(`${this.api}/wallet/keys?address=${address}&code=${code}`);
	};

}