import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  AgmCoreModule,
  GoogleMapsAPIWrapper
} from '@agm/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfnrYNQtMC-PqTWvH9F36TehlAN6Zw3MM'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
