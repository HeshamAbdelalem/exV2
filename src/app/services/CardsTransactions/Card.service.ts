import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService';
import { AutoComplete } from '../../models/AutoComplete';
import { Card } from '../../models/CardsTransactions/Card';
import { ResultViewModel } from '../../models/ResultViewModel';

@Injectable()
export class CardService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
    this.ApiName = 'Card';
  }

  public Card_Auto(trem?: string): Observable<any> {
    this.autoComplete = new AutoComplete();
    this.autoComplete.Table = 'Card_Vw';
    this.autoComplete.SelectColumns = 'ID, CardNo, CardTypeID, CardType_Name, CardCode, NameOnCard, CardOwnerName, CardIssuerID, CardIssuer_Name, BankID, Bank_Name, CardCurrencyID, CardCurrency_Name, CardPin';
    this.autoComplete.SearchColumns = 'ID, CardNo, CardOwnerName';
    this.autoComplete.SearchCriteria = (trem === '' || trem === undefined) ? `%%` : `` + trem + `%`;
    return this.AutoComplete(this.autoComplete);
  }

  public GetCard(id: number): Observable<Card> {
    return this.GetByID(id).pipe(map(res => res));
  }

  public GetCardPage(obj: Card): Observable<ResultViewModel> {
    return this.GetPage(obj);
  }

  public GetCardPage_Old(sortColumn: string, sortDir: string, pageIndex: number): Observable<any> {

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

  public AddCard(obj: Card): Observable<ResultViewModel> {
    return this.Add(obj);
  }

  public UpdateCard(obj: Card): Observable<ResultViewModel> {
    return this.Update(obj);
  }

  public DeleteCard(id: number): Observable<ResultViewModel> {
    return this.Delete(id);
  }

}
