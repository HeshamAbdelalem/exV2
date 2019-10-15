import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { XStaticAccount } from '../../models/Lookups/XStaticAccount';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class XStaticAccountService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'XStaticAccount';
  }

  public XStaticAccount_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'XStaticAccount_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetXStaticAccount(id: number): Observable<XStaticAccount> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetXStaticAccountPage(obj: XStaticAccount): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetXStaticAccountPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddXStaticAccount(obj: XStaticAccount): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateXStaticAccount(obj: XStaticAccount): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteXStaticAccount(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
