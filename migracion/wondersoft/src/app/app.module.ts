import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';

// Modules
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { DeviceDetectorModule } from 'ngx-device-detector';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
// Service
import { OSBService } from './services/osb.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    LoadingBarModule.forRoot(),
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    OSBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
