import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, PrayerDetail, PrayerState} from '../model';


@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  _status = 0;
  _message = '';
  _api = 'Prayer_api/';

  constructor(public _http: HttpClient) {
  }

  public get_videos(token:string):Promise<Array<string>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_videos", body, { headers: Config.createRequestOptions() }).toPromise();
    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;

      if (res.status === 200) {
          return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }

  public gets(token:string):Promise<Array<PrayerState>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "gets", body, { headers: Config.createRequestOptions() }).toPromise();
    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;

      if (res.status === 200) {
          return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }

  public buy_seed(token:string, prayer:string):Promise<PrayerState>{
    const body = JSON.stringify({token: token, prayer:prayer});
    const promise = this._http.post(Config._baseUrl + this._api + "buy_seed", body, { headers: Config.createRequestOptions() }).toPromise();
    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;

      if (res.status === 200) {
          return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }

  public grow(token:string, Id:number, bible:string):Promise<PrayerState>{
    const body = JSON.stringify({token: token, Id:Id, bible:bible});
    const promise = this._http.post(Config._baseUrl + this._api + "grow", body, { headers: Config.createRequestOptions() }).toPromise();
    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;

      if (res.status === 200) {
          return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }  

  public get_home_contents():Promise<any>{
    const body = "";
    const promise = this._http.post(Config._baseUrl + this._api + "get_home_contents", body, { headers: Config.createRequestOptions() }).toPromise();
    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;

      if (res.status === 200) {
          return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }

}
