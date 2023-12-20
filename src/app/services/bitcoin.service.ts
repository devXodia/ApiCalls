import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface BitcoinData {
  bpi: {};
  chartname: {};
  disclaimer: string;
  time: {};
}

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  pricesJSON: Partial<BitcoinData> = {};

  constructor(public http: HttpClient) {}

  getCoin() {
    return this.pricesJSON;
  }

  async fetchBitcoin() {
    try {
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
      let bitcoinDetails = await lastValueFrom(this.http.get(url));
      this.pricesJSON = bitcoinDetails;
    } catch (e) {
      return console.error(e);
    }
  }
}
