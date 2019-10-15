import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

   constructor(private http: HttpClient) {
        // this.getSettings().subscribe();
    }

    public getSettings(): Observable<any> {
        return this.http.get("../../assets/json/settings.json");
    }
}