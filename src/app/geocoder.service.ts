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
          /** 結果を成形 */

          /*
           * 返ってきた逆geocode結果から、
           * もっとも情報量の多いものを選ぶ
           *   具体的には、address_componentsの要素数が一番多いものを選ぶ
           */
          let address;
          let max_length = 0;

          results.forEach(function(result, index, results) {
            if (index == 0) {
              address    = result;
              max_length = result.address_components.length;
            } else {
              let length  = result.address_components.length;
              if (max_length < length) {
                address    = result;
                max_length = length;
              }
            }
          });
          console.log(address);

          let components = address.address_components.reverse();
          let addressStr = '';
          components.forEach(function(component, index, components) {
            if(
              component.types.indexOf('political') >= 0
            && component.types.indexOf('country') == -1
            && component.types.indexOf('administrative_area_level_1') == -1
            ) {
              let long_name = component.long_name;
              if(
                component.types.indexOf('sublocality_level_3') >= 0
              || component.types.indexOf('sublocality_level_4') >= 0
              ) {
                long_name = long_name + '-';
              }
              addressStr = addressStr  + long_name;
            }
          });
          let endStr = addressStr.slice(-1);
          if (endStr == '-') {
            addressStr = addressStr.slice(0, -1);
          }
          console.log(addressStr);

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          return false;
        }
      });
    });
  }

}
