import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {
  AgmCoreModule,
  GoogleMapsAPIWrapper,
  MapsAPILoader
} from '@agm/core';


declare var google: any;

@Injectable()
export class GeocoderService extends GoogleMapsAPIWrapper {

  constructor(
    private __loader :MapsAPILoader,
    private __zone :NgZone
  )
  {
    super(__loader, __zone);
  }

  getLatLan(address: string)
  {
    // google maps scriptsがloadしおわる
    this.__loader.load().then(() => {

      // geocoderオブジェクトを取得する
      let geocoder = new google.maps.Geocoder();
      console.log(geocoder);

      geocoder.geocode( { 'address': address}, function(results, status) {
        /** ここが非同期なんだ。。 */
        if (status == 'OK') {
          console.log(results);
          console.log(results[0]);
          console.log(results[0].geometry);
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
          return results;
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          return false;
        }
      });
    });
  }


  getAddress(lat, lng)
  {
    // google maps scriptsがloadしおわる
    this.__loader.load().then(() => {

      let latlng = new google.maps.LatLng(lat, lng);

      // geocoderオブジェクトを取得する
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'latLng': latlng }, function(results, status) {
        /** ここが非同期なんだ。。 */
        if (status == 'OK') {
          console.log(results);
          return results;
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          return false;
        }
      });
    });
  }

}
