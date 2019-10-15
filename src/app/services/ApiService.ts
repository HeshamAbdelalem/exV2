import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AutoComplete } from '../models/AutoComplete';
import { ResultViewModel } from '../models/ResultViewModel';
// import 'rxjs/add/operator/map';

import * as Cookies from 'es-cookie';

@Injectable()
export class ApiService {
  public url: string;
  public ApiName: string;
  public autoComplete: AutoComplete;
  public UserID;
  public ProjectID;

  constructor(private Http: HttpClient) {
  }

  getToken() {
    return Cookies.get('token');
  }

  private getHttpOptions(): HttpHeaders {

    const httpOptions = {
        'Content-Type': 'application/json'
    };

    return new HttpHeaders(httpOptions);

  }
  
  public Add(obj: any): Observable<any> {
    this.url = environment.api_url + this.ApiName;

    return this.Http.post<any>(`${this.url}`, obj, { headers: this.getHttpOptions() })
      .pipe(catchError(err => this.handleError(err)));
  }

  public Get(extraParams: string = ''): Observable<any> {
    this.url = environment.api_url + this.ApiName;
    this.url = `${this.url}${extraParams}`;
    return this.Http.get(this.url, { headers: this.getHttpOptions() })
    .pipe(map(res => (<ResultViewModel>res).Data));
  }

  public GetPage(obj: any): Observable<any> {
    this.url = environment.api_url + this.ApiName;
    this.url = `${this.url}/GetListPage`;
    return this.Http.post<any>(`${this.url}`, obj, { headers: this.getHttpOptions() })
    .pipe(catchError(err => this.handleError(err)));
  }

  public GetByID(id: any): Observable<any> {
    if (id !== 0 && id !== "0") {
      this.url = environment.api_url + this.ApiName;
      const _url = `${this.url}/${id}`;
      return this.Http.get(_url, { headers: this.getHttpOptions() })
      .pipe(map(res => (<ResultViewModel>res).Data));  
    } else {
      return new Observable<null>();
    } 
  }

  public Update(user: any): Observable<any> {
 
    this.url = environment.api_url + this.ApiName;

    return this.Http.put<any>(`${this.url}`, user, { headers: this.getHttpOptions() })
      .pipe(catchError(err => this.handleError(err)));
  }

  public Delete(id: number): Observable<any> {
    this.url = environment.api_url + this.ApiName;

    const _url = `${this.url}/${id}`;
    return this.Http.delete<any>(`${_url}`, { headers: this.getHttpOptions() })
      .pipe(catchError(err => this.handleError(err)));
  }

  // autoComplete
  public AutoComplete(autoComplete: AutoComplete): Observable<any> {
    const _url = `${environment.api_url}/${'AutoCompelete'}`;
    return this.Http.post<any>(`${_url}`, autoComplete, { headers: this.getHttpOptions() }).pipe(catchError(err => this.handleError(err)));
  }

  public GetByUrl(extraParams: string): Observable<any> {
    const URL = `${environment.api_url}${extraParams}`;
    return this.Http.get(URL).pipe(map(res => (<ResultViewModel>res).Data));
  }

  private getHttpOptionsForFiles(): HttpHeaders {

    const httpOptions = {
        'Content-Type': 'multipart/form-data',
        'Authorization': this.getToken(),
    };

    return new HttpHeaders(httpOptions);
  }

  public Upload(obj: any): Observable<any> {
    const apiRoute = 'Upload';
    this.url = `${environment.api_url}${apiRoute}`;
    return this.Http.post(`${this.url}`, obj, { headers: this.getHttpOptionsForFiles() })
        .pipe(catchError(err => this.handleError(err)));
  }

  public Print(obj: any): Observable<any> {
    const apiRoute = obj.api;
    this.url = `${environment.api_url}${apiRoute}`;
    return this.Http.post<any>(`${this.url}`, obj, { headers: this.getHttpOptions() })
        .pipe(catchError(err => this.handleError(err)));
  }

  public handleError(error?: any) { // HttpErrorResponse
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return null;
      // 'Something bad happened; please try again later.');
    }
}
