import { Component, OnInit } from '@angular/core';
import { WeatherService } from "./weather.service";
import { Weather } from "./weather";

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'D3.js with Angular 2!';
  subtitle: string = 'Line Chart';

 
  constructor() {}

  ngOnInit() {
   
  }

}

