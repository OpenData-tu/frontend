import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Weather } from './weather';

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class WeatherService {


  private weatherUrl = environment.restEndpoint + '/api/indices/weather'; 
 
  constructor(private http: Http) { }
  
  getWeather(): Promise<Weather[]> {
    return this.http.get(this.weatherUrl)
              .toPromise()
              .then(response => 
              {
                return response.json().map(d => {                  
                  return {
                    "date": new Date(d.timestamp),
                    "value": d.sensors.temperature.observation_value
                  };
                }
                  ) as Weather[]
              })
              .catch(this.handleError);
  }

  getAggregations(type: string, time: string): Promise<Weather[]> {
    return this.http.get(this.weatherUrl + "/bucket/" + time + "/agr/" + type)
              .toPromise()
              .then(response => 
              {
                return response.json().map(d => {                  
                  return {
                    "date": new Date(d.timestamp),
                    "value": d.value
                  };
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
