import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { SystemPage } from '../../models/Configurations/SystemPage';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class SystemPageService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'SystemPage';
  }

  public SystemPage_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'SystemPage_Vw';
    this.autoComplete.SelectColumns = 'ID, Code, Name';
    this.autoComplete.SearchColumns = 'ID, Code, Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetSystemPage(id: number): Observable<SystemPage> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetSystemPagePage(obj: SystemPage): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetSystemPagePage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddSystemPage(obj: SystemPage): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateSystemPage(obj: SystemPage): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteSystemPage(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
