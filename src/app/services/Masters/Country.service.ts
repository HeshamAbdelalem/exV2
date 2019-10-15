import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { Country } from '../../models/Masters/Country';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class CountryService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'Country';
  }

  public Country_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'Country_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetCountry(id: number): Observable<Country> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetCountryPage(obj: Country): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetCountryPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

    sortColumn = 'ID';

    sortDir = 'Asc';

    let extraParams = ``;
    
    extraParams += `?`;
    extraParams += `sortColumn=${sortColumn}`;
    extraParams += `&sortDir=${sortDir}`;
    extraParams += `&pageSize=${environment.pageSize}`;
    extraParams += `&pageIndex=${pageIndex + 1}`;
    return this.Get(extraParams).pipe(map(res => res));

  }

  public AddCountry(obj: Country): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateCountry(obj: Country): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteCountry(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
