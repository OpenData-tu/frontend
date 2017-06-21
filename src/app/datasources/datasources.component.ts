import { Component, OnInit } from '@angular/core';
import { Datasource } from "./../meta";

import { MetadataService } from "./../metadata.service";

@Component({
  selector: 'app-datasources',
  templateUrl: './datasources.component.html',
  styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {

  datasources : Datasource[];

  constructor(private metadataService:MetadataService) { }

  ngOnInit() {
    this.metadataService.getSources().then(d => this.datasources = d)

  }

}
