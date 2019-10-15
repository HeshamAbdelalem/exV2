import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { Account } from '../../models/GeneralLedger/Account';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class AccountService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'Account';
  }

  public Account_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'Account_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetAccount(id: number): Observable<Account> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetAccountPage(obj: Account): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetAccountPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddAccount(obj: Account): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateAccount(obj: Account): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteAccount(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
