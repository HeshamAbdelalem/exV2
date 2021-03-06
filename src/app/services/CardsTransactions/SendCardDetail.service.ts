import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { SendCardDetail } from '../../models/CardsTransactions/SendCardDetail';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class SendCardDetailService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'SendCardDetail';
  }

  public SendCardDetail_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'SendCardDetail_Vw';
    this.autoComplete.SelectColumns = 'ID, Name';
    this.autoComplete.SearchColumns = 'Name';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetSendCardDetail(id: number): Observable<SendCardDetail> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetSendCardDetailPage(obj: SendCardDetail): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetSendCardDetailPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddSendCardDetail(obj: SendCardDetail): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateSendCardDetail(obj: SendCardDetail): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteSendCardDetail(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
