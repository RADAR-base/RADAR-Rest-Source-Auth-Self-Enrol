import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {DeviceUser} from "../models/device.model";
import {environment} from "../../environments/environment";

export class AuthorizedDeviceDetails {
  externalUserId: string | null;
  authorized: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private serviceUrl = environment.BACKEND_BASE_URL + "/users";
  constructor(private http: HttpClient) { }

  getDevices(): Observable<DeviceUser[]> {
    console.log("get devices")
    return this.http.get<DeviceUser[]>(this.serviceUrl);
  }

  updateDeviceUser(deviceUser: DeviceUser): Observable<any> {
    return this.http.put(this.serviceUrl + '/' + deviceUser.id, deviceUser);
  }

  addAuthorizedUser(code: string, state: string): Observable<any> {
    console.log("send addAuthorizedUser request")
    const params = new HttpParams()
      .set('code', code)
      .set('state', state);

    return this.http.post(this.serviceUrl ,params);
  }

  delete(deviceId: number): Observable<any> {
    return this.http.delete(`${this.serviceUrl}/${deviceId}`);
  }


}
