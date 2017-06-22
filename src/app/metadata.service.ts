import { Injectable } from '@angular/core';
import { Datasource } from "./meta";

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class MetadataService {
  
  private weatherUrl = environment.restEndpoint + '/api/indices';  // URL to web api
 
  constructor(private http: Http) { }
  
  getSources(): Promise<Datasource[]> {
    return this.http.get(this.weatherUrl)
              .toPromise()
              .then(response => 
              {
                return response.json() as Datasource[]
              })
              .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
