import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { ReceiveCardDetail } from '../../models/CardsTransactions/ReceiveCardDetail';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class ReceiveCardDetailService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'ReceiveCardDetail';
  }

  public ReceiveCardDetail_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'ReceiveCardDetail_Vw';
    this.autoComplete.SelectColumns = 'ID, Card_CardNo as Name, CardID, Card_CardNo, Card_CardType_Name, Card_CardCode, Card_NameOnCard, Card_CardOwnerName, Card_CardIssuer_Name, Card_Bank_Name, Card_CardCurrency_Name, Card_CardPin';
    this.autoComplete.SearchColumns = 'Card_CardNo';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetReceiveCardDetail(id: number): Observable<ReceiveCardDetail> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetReceiveCardDetailPage(obj: ReceiveCardDetail): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetReceiveCardDetailPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddReceiveCardDetail(obj: ReceiveCardDetail): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateReceiveCardDetail(obj: ReceiveCardDetail): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteReceiveCardDetail(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
