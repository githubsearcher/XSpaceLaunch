import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SpaceXLaunchService {
    constructor(private http: HttpClient) { }


    getLaunchSuccessData(paramsData) {
        return this.http.get(environment['API_ENDPOINT'], {params: paramsData});
    }

}