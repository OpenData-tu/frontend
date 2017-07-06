import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as L from "leaflet";
//import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  bundeslaenderGeoJson: any;
  geojsonLayer: any;
  map: any;
  mode: boolean = true;

  selected = "";
  pointarray = [];
  constructor(private http: Http) { }

  public getJSON(): Observable<any> {
    return this.http.get("../assets/bundeslaender_simplify200.geojson")
      .map((res: any) => res.json());

  }
  ngOnInit() {
    this.getJSON().subscribe(data => {
      this.bundeslaenderGeoJson = data;
      console.log(this.bundeslaenderGeoJson);

      this.map = L.map("map").setView([51.27, 10.5], 6);


      this.geojsonLayer = L.geoJson(this.bundeslaenderGeoJson, {
        onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
      }).addTo(this.map);
      /*
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoibWFzb252eCIsImEiOiJjajRwaGl6OWsyOHNiMndvN293em51dWdqIn0.ybG25BoxJ1hVfRmQnpONmA'
      }).addTo(this.map);
      */

    });
  }

  changeMode(){
    console.log(this.mode);
    if(this.mode){
      this.map.dragging.enable();
    }else{
      this.map.dragging.disable();
    }
    
  }

  highlightFeature(e): void {
    let layer = e.target;
    this.selected = e.target.feature.properties.GEN;
    this.pointarray = e.target.feature.geometry.coordinates;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });



    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }


  }

  zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }
  resetHighlight(e): void {
    this.geojsonLayer.resetStyle(e.target);
    this.selected = "";
  }

  onEachFeature(feature, layer): void {
    layer.on({
      mouseover: (e) => this.highlightFeature(e),
      mouseout: (e) => this.resetHighlight(e),
      click: (e) => this.zoomToFeature(e)      
    });
  }

}
