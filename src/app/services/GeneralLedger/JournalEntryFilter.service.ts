import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { JournalEntryFilter } from '../../models/GeneralLedger/JournalEntryFilter';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class JournalEntryFilterService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'JournalEntryFilter';
  }

  public JournalEntryFilter_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'JournalEntryFilter_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetJournalEntryFilter(id: number): Observable<JournalEntryFilter> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetJournalEntryFilterPage(obj: JournalEntryFilter): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetJournalEntryFilterPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddJournalEntryFilter(obj: JournalEntryFilter): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateJournalEntryFilter(obj: JournalEntryFilter): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteJournalEntryFilter(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
