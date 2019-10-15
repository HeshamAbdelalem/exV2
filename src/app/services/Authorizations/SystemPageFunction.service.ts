import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { SystemPageFunction } from '../../models/Authorizations/SystemPageFunction';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class SystemPageFunctionService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'SystemPageFunction';
  }

  public SystemPageFunction_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'SystemPageFunction_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetSystemPageFunction(id: number): Observable<SystemPageFunction> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetSystemPageFunctionPage(obj: SystemPageFunction): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetSystemPageFunctionPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddSystemPageFunction(obj: SystemPageFunction): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateSystemPageFunction(obj: SystemPageFunction): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteSystemPageFunction(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
