import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Weather } from './weather';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService {


  private weatherUrl = 'api/weather';  // URL to web api
 
  constructor(private http: Http) { }
  
  getWeather(): Promise<Weather[]> {
    return this.http.get(this.weatherUrl)
              .toPromise()
              .then(response => 
              {
                return response.json().data.map(d => {
                  d.date = new Date(d.date)
                  return d;
                }
                  ) as Weather[]
              })
              .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
