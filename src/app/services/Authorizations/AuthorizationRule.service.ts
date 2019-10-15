import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { AuthorizationRule } from '../../models/Authorizations/AuthorizationRule';
import { ResultViewModel } from '../../models/ResultViewModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorizationRuleService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'AuthorizationRule';
  }

  public AuthorizationRule_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'AuthorizationRule_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetAuthorizationRule(id: number): Observable<AuthorizationRule> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetAuthorizationRulePage(obj: AuthorizationRule): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetAuthorizationRulePage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddAuthorizationRule(obj: AuthorizationRule): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateAuthorizationRule(obj: AuthorizationRule): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteAuthorizationRule(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
