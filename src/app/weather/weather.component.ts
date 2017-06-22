import { Component, OnInit } from '@angular/core';
import { WeatherService } from "./../weather.service";
import { Weather } from "./../weather";

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

subtitle: string = 'Line Chart';
title: string = "All Data"

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(
    private weatherService:WeatherService
  ) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.weatherService.getAggregations("avg", "month").then(d => this.repaintSvg(d));
    
    
    
  }

  detail(): void {
    this.svg.remove('path');
    this.weatherService.getWeather().then(d => this.repaintSvg(d));
    
  }

  day(): void {
    this.svg.remove('path');
    this.weatherService.getAggregations("avg", "day").then(d => this.repaintSvg(d));
  }

  month(): void {        
    this.weatherService.getAggregations("avg", "month").then(d => this.repaintSvg(d));
  }

  private repaintSvg(d : Weather[]){   
    this.title = "Dataset has " + d.length + " Datapoints";
      this.initSvg()
      this.initAxis(d);
      this.drawAxis();
      this.drawLine(d);

  }

  private initSvg() {
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }

  private initAxis(d : Weather[]) {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(d, (e) => e.date ));
    this.y.domain(d3Array.extent(d, (e) => e.value ));
  }

  private drawAxis() {

    this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));

    this.svg.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Temperature (C°)");
  }

  private drawLine(d : Weather[]) {
    this.line = d3Shape.line()
                       .x( (d: any) => this.x(d.date) )
                       .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
            .datum(d)
            .attr("class", "line")
            .attr("d", this.line);
  }
}
