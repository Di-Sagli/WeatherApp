import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
	weatherUrl: string = '';
	forecastUrl: string = '';

  constructor(private _http: HttpClient) { }

  ngOnInit(){} 

  getWeather(city: string):Observable<any>{
  	this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a375adbe81d0a9b1e1118f3785c5882f'
  	return  this._http.get(this.weatherUrl);
  }

	getForecast(city: string):Observable<any>{
		this.forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=a375adbe81d0a9b1e1118f3785c5882f'
  	return  this._http.get(this.forecastUrl);
  }   

}
