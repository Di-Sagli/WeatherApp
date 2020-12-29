import { Component } from '@angular/core';
import { WeatherApiService } from './weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherApiService]
})
export class AppComponent {
  
	Weather: any = {};
	Forecast: Array<any> = [{}];
	city: string = '';

	iconcode: String = '';
	forecastIcons: Array<string> = []
  constructor(private _weather: WeatherApiService){}

  ngOnInit(){
  	this.getWeather()
  }

  getWeather(){
  	this._weather.getWeather(this.city).subscribe(data => {
  		if (data) {
  			this.Weather = data;
  			this.iconcode = this.Weather.weather[0].icon;
  			console.log(this.Weather);
  		}else{
  			alert('Error')
  		}
  	})
  }

  getForecast(){
  	this._weather.getForecast(this.city).subscribe(data => {
  		if(data){
  			this.Forecast = data.list.slice(0,3);
  			console.log(this.Forecast);
  			
  			for(let i=0; i<this.Forecast.length; i++){
  				this.forecastIcons.push(this.Forecast[i].weather[0].icon);
  			}
  		}
  	})
  }
}
