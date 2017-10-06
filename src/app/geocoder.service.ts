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
          return results;
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          return false;
        }
      });

//      /** Observable.createでstreamが作成できる */
//      return Observable.create(observer => {
//        console.log('111111');
//        geocoder.geocode( {'address': address }, function(results, status) {
//          if (status == google.maps.GeocoderStatus.OK) {
//            console.log('aa');
//            observer.next(results[0].geometry.location);
//            observer.complete();
//          } else {
//            console.log('bb');
//            console.log('error - ', results, ' & Status - ', status);
//            observer.next({});
//            observer.complete();
//          }
//        });
//      });

    });
  }
}
