import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { WeatherService } from "./weather.service";
import { DatasourcesComponent } from './datasources/datasources.component';
import { WeatherComponent } from './weather/weather.component';
import { MetadataService } from "./metadata.service";
import { ExplorerComponent } from './explorer/explorer.component';


@NgModule({
  declarations: [
    AppComponent,
    DatasourcesComponent,
    WeatherComponent,
    ExplorerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService,{
  passThruUnknownUrl: true
}),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/weather',
        pathMatch: 'full'
      },
      {
        path: 'explorer',
        component: ExplorerComponent
      },
      {
        path: 'weather',
        component: WeatherComponent
      },{
        path: 'datasources',
        component: DatasourcesComponent
      }
    ])
  ],
  providers: [WeatherService,MetadataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
