import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { SystemMenu } from '../../models/Configurations/SystemMenu';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class SystemMenuService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'SystemMenu';
  }

  public SystemMenu_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'SystemMenu_Vw';
    this.autoComplete.SearchColumns = 'ID, Code, Name';
    this.autoComplete.SelectColumns = 'ID, Code, Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetSystemMenu(id: number): Observable<SystemMenu> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetSystemMenuPage(obj: SystemMenu): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetSystemMenuPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddSystemMenu(obj: SystemMenu): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateSystemMenu(obj: SystemMenu): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteSystemMenu(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
