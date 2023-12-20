import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root',
})
export class CommuteService {
  commuteData: any;

  constructor(private http: HttpClient) {
    this.fetchCommute();
  }

  async fetchCommute() {
    const url =
      'https://www.rmv.de/auskunft/bin/jp/stboard.exe/dn?L=vs_anzeigetafel&cfgfile=DarmstadtH_3004734_408084162&outputMode=xml&start=yes&output=xml&';

    this.http.get(url, { responseType: 'text' }).subscribe(
      (xmlString) => {
        parseString(xmlString, (err, result) => {
          if (!err) {
            this.commuteData = result.ResC.SBRes[0].JourneyList[0].Journey;
          } else {
            console.error('Error parsing:', err);
          }
        });
      },
      (error) => {
        console.error('Error fetching:', error);
      }
    );
  }
}
