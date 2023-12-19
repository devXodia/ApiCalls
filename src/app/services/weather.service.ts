import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherJSON: any = '';
  middayWeatherData: any;
  currentDate: Date;
  futureDates: string[] = [];
  constructor(public http: HttpClient, private datePipe: DatePipe) {
    this.currentDate = new Date();
  }

  getWeather() {
    return this.weatherJSON;
  }

  async fetchWeather() {
    try {
      const url =
        'https://www.7timer.info/bin/civil.php?lon=9.155690577416188&lat=49.9761904564259&ac=0&unit=metric&output=json&tzshift=0';
      let weatherDetails = await lastValueFrom(this.http.get(url));
      this.weatherJSON = weatherDetails;
      this.middayWeatherData = this.weatherJSON.dataseries.filter(
        (item: any) => item.timepoint % 24 === 12
      );
    } catch (e) {
      return console.error(e);
    }
  }

  calcDates() {
    for (let i = 0; i < 8; i++) {
      const nextDate = new Date(this.currentDate);
      nextDate.setDate(this.currentDate.getDate() + i);
      const formattedDate = this.datePipe.transform(
        nextDate,
        'EEE MMM dd yyyy'
      );
      this.futureDates.push(formattedDate!);
    }
  }
}
