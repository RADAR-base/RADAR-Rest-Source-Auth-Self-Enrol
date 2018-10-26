import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {DeviceUser} from "../models/device.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DeviceAuthorizationService {
  private serviceUrl = environment.BACKEND_BASE_URL;
  constructor(private http: HttpClient) { }

  getDeviceTypes(): Observable<any> {
    return this.http.get(this.serviceUrl + '/device-clients/device-type');
  }

  getDeviceClientAuthDetails(deviceType: string): Observable<any> {
    return this.http.get(this.serviceUrl + '/device-clients/' + deviceType);
  }
}

