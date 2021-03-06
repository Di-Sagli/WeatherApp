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
	ForecastData: Array<any> = [];
	city: string = 'bogota';
  c_temperature: any;
  kelvins: number = 273.15;
  parisIcon: string = '';
  parisTemp: any;
  cityName: string = '';
  humidity: any; 
  windSpeed: any; 

  LyonIcon: string = '';
  LyonTemp: any;
  lcityName: string = '';
  lhumidity: any; 
  lwindSpeed: any


	icon: String = '';
	forecastIcons: Array<string> = [];
  forecastInfo: Array<any> = [];
  weekDays: Array<any> = [
     'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  constructor(private _weather: WeatherApiService){}

  ngOnInit(){
  	this.getWeather(this.city)
    this.getParisWeather('Paris')
    this.getLyonWeather('Lyon')
    this.getForecast(this.city)
  }

  getWeather(city:string){
  	this._weather.getWeather(city).subscribe(data => {
  		if (data) {
  			this.Weather = data;
  			this.icon = this.Weather.weather[0].icon;
        this.c_temperature = (this.Weather.main.temp  - this.kelvins).toFixed(1);
  		}else{
  			alert('Error')
  		}
  	})
  }

  getLyonWeather(city:string){
    this._weather.getWeather(city).subscribe(data => {
      if (data) {
        this.Weather = data;
        this.LyonIcon = this.Weather.weather[0].icon;
        this.LyonTemp = (this.Weather.main.temp  - this.kelvins).toFixed(1);
        this.lcityName = this.Weather.name;
        this.lhumidity = this.Weather.main.humidity;
        this.lwindSpeed = this.Weather.wind.speed;
      }else{
        alert('Error')
      } 
    })
  }


  getParisWeather(city:string){
    this._weather.getWeather(city).subscribe(data => {
      if (data) {
        this.Weather = data;
        this.parisIcon = this.Weather.weather[0].icon;
        this.parisTemp = (this.Weather.main.temp  - this.kelvins).toFixed(2);
        this.cityName = this.Weather.name;
        this.humidity = this.Weather.main.humidity;
        this.windSpeed = this.Weather.wind.speed;
      }else{
        alert('Error')
      }
    })
  }

  getForecast(city:string){
  	this._weather.getForecast(city).subscribe(data => {
  		if(data){
  			this.ForecastData.push(data.list[1]);
        this.ForecastData.push(data.list[9]);
        this.ForecastData.push(data.list[17]);
        
        var day:number = new Date().getDay();

  			this.ForecastData.forEach( w => { 
         
         var icon = w.weather[0].icon;
         var min_temp = (w.main.temp_min - this.kelvins).toFixed();
         var max_temp = (w.main.temp_max - this.kelvins).toFixed();
         this.forecastInfo.push({icon: icon, min: min_temp, max: max_temp, day: this.weekDays[day]})
         day++;
        })

  		}
  	})
  }
}
