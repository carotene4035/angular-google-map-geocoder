import { Component } from '@angular/core';
import { GeocoderService } from './geocoder.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lat: number = 35.681167;
  lng: number = 139.767052;
  zoom: number = 16;

  private subscription :Subscription;

  constructor(
    private geocoderService :GeocoderService
  ) {}

  onClick()
  {
    let address = '東京';
    let ret = this.geocoderService.getLatLan(address);
    console.log(ret);

//    this.subscription = this.geocoderService.getLatLan(address).subscribe(
//    );
  }
}
