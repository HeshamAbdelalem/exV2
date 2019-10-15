import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { NamedObject } from '../../models/Supers/NamedObject';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class NamedObjectService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'NamedObject';
  }

  public NamedObject_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'NamedObject_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetNamedObject(id: number): Observable<NamedObject> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetNamedObjectPage(obj: NamedObject): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetNamedObjectPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddNamedObject(obj: NamedObject): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateNamedObject(obj: NamedObject): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteNamedObject(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
