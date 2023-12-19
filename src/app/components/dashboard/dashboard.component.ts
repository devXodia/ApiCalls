import { Component, NgModule } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from '@angular/common';
import { CommuteService } from '../../services/commute.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private coin: BitcoinService,
    private weather: WeatherService,
    private datePipe: DatePipe,
    private commute: CommuteService
  ) {
    this.getBitcoin();
    this.weather.calcDates();
    this.getWeather();
  }
  weatherData: any;
  availableCoin: any;
  finishedLoading: boolean = false;
  currentDate: Date = new Date();
  futureDates: string[] = [];

  ngOnInit() {}

  async getBitcoin() {
    await this.coin.fetchBitcoin();
    this.availableCoin = this.coin.getCoin();
    this.finishedLoading = true;
  }

  async getWeather() {
    await this.weather.fetchWeather();
    this.weatherData = this.weather.middayWeatherData;
    this.currentDate = this.weather.currentDate;
    this.futureDates = this.weather.futureDates;
  }
}
