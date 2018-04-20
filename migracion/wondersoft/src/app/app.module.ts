import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



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
    BrowserModule
  ],
  providers: [
    OSBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
